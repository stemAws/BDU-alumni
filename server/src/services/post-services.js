const db = require("../config/db");

exports.createPost = async function (alumniID, content, image, suggestToAdmin) {
  try {
    console.log(alumniID);
    const [result] = await db.query(
      "INSERT INTO Post (alumniId, content, mediaPath, suggestToAdmin) VALUES (?, ?, ?, ?)",
      [alumniID, content, image || null, suggestToAdmin || 0]
    );

    return result.insertId;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

exports.updateSuggestedByAdmin = async function (postId, updateSuggestByAdmin) {
  const { suggestedByAdmin } = updateSuggestByAdmin;

  const [result] = await db.query(
    "UPDATE Post SET suggestedByAdmin = ? WHERE postId = ?",
    [suggestedByAdmin, postId]
  );

  return result.affectedRows;
};

exports.getPostByAlumniId = async function (alumniID) {
  try {
    const [rows] = await db.query("SELECT * FROM Post WHERE alumniId = ?", [
      alumniID,
    ]);

    if (rows.length === 0) {
      throw new Error("Post not found");
    }

    return rows;
  } catch (error) {
    console.error("Error getting Post by id:", error);
    throw error;
  }
};

exports.getAllPosts = async function () {
  try {
    const [posts] = await db.query("SELECT * FROM Post");

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

exports.getAddedStories = async function () {
  try {
    const [posts] = await db.query(`
      SELECT 
        Post.*, 
        Person.fullName, 
        Alumni.profilePicture 
      FROM 
        Post
      JOIN 
        Alumni ON Post.alumniId = Alumni.alumniId
      JOIN 
        Person ON Alumni.personId = Person.personId
      WHERE 
        Post.suggestedByAdmin = 1
    `);

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

exports.getPostsByUsername = async function (username) {
  try {
    const [post] = await db.query(
      "SELECT P.* FROM Post P JOIN Alumni A JOIN Person PE WHERE P.alumniId = A.alumniId AND PE.personId = A.personId AND PE.username = ?",
      [username]
    );

    return post;
  } catch (error) {
    console.error("Error fetching Post by username:", error);
    throw error;
  }
};

exports.deletePost = async function (postId) {
  try {
    const [result] = await db.query("DELETE FROM Post WHERE postId = ?", [
      postId,
    ]);

    return result.affectedRows;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

exports.updatePost = async function (postId, updatedPostData) {
  const { content, suggestToAdmin } = updatedPostData;

  const [result] = await db.query(
    "UPDATE Post SET content = ?, suggestToAdmin = ? WHERE postId = ?",
    [content, suggestToAdmin, postId]
  );

  return result.affectedRows;
};

exports.getPostImage = async function (postID) {
  const result = await db.query("SELECT mediaPath FROM Post where postId = ?", [
    postID,
  ]);
  return result[0][0];
};
