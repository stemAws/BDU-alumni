const db = require('../models/db');

const createPost = async function (alumniID, content, image, suggestToAdmin) {
  try {
    const [result] = await db.query(
      'INSERT INTO posts (alumniID, content, image, suggestToAdmin) VALUES (?, ?, ?, ?)',
      [alumniID, content, image, suggestToAdmin]
    );

    return result.insertId;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

const updateSuggestedByAdmin = async function (postId, updateSuggestByAdmin) {
  const { suggestedByAdmin } = updateSuggestByAdmin;

  const [result] = await db.query(`
    UPDATE posts
    SET suggestedByAdmin = ?
    WHERE postId = ?
  `, [suggestedByAdmin, postId]);

  return result.affectedRows;
};

const getPostByAlumniId =  async function (alumniID) {
  try {
    const [rows] = await db.query('SELECT * FROM posts WHERE alumniID = ?', [alumniID]);

    if (rows.length === 0) {
      throw new Error('Post not found');
    }

    return rows;
  } catch (error) {
    console.error('Error getting post by id:', error);
    throw error;
  }
}

const getAllPosts = async function  () {
  try {
    const [posts] = await db.query("SELECT * FROM posts");

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
};

const getAddedStories = async function  () {
  try {
    const [posts] = await db.query("SELECT * FROM posts WHERE suggestedByAdmin = 1");

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
};

const getPostsByUsername = async function (username) {
  try {
    const [post] = await db.query(`
      SELECT P.*
      FROM posts P
      JOIN alumni A ON P.alumniID = A.alumniID
      WHERE A.username = ?
    `, [username]);

    return post;
  } catch (error) {
    console.error('Error fetching post by username:', error);
    throw error;
  }
};

const deletePost = async function (postId) {
  try {
    const [result] = await db.query('DELETE FROM posts WHERE postId = ?', [postId]);

    return result.affectedRows;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

const updatePost = async function(postId, updatedPostData) {
  const { content, suggestToAdmin } = updatedPostData;

  const [result] = await db.query(`
    UPDATE posts
    SET content = ?, suggestToAdmin = ?
    WHERE postId = ?
  `, [content, suggestToAdmin, postId]);

  return result.affectedRows;
}

const getPostImage = async function(postID) {
  const result = await db.query('SELECT image FROM posts where postId = ?', postID)
  return result[0][0];
}

module.exports = {
  createPost,
  getPostByAlumniId,
  getAllPosts,
  getPostsByUsername,
  getAddedStories,
  updateSuggestedByAdmin,
  deletePost,
  updatePost,
  getPostImage
};