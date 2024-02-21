const postService = require("../services/post-services");
const path = require("path");
const sharp = require('sharp');

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebaseConfig");
const firebase = require("firebase/app");

firebase.initializeApp(firebaseConfig);

const storage = getStorage();

exports.createPost = async (req, res) => {
  const { content, suggestToAdmin } = req.body;
  const alumniID = req.params.alumniID;

  try {
    let downloadURL = null;

    if (req.file) {
      const filePath = `posts/${alumniID}-${Date.now()}${path.extname(
        req.file.originalname
      )}`;
      const fileRef = ref(storage, filePath);

      const resizedFile = await sharp(req.file.buffer).jpeg({ quality: 40 }).toBuffer()

      await uploadBytes(fileRef, resizedFile);
      downloadURL = await getDownloadURL(fileRef);
    }

    const postId = await postService.createPost(
      alumniID,
      content,
      downloadURL,
      suggestToAdmin
    );

    res.json({ postId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const events = await postService.getAllPosts();
    res.send(events);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAddedStories = async (req, res) => {
  try {
    const events = await postService.getAddedStories();
    res.send(events);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateSuggestedByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPostData = req.body;

    const affectedRows = await postService.updateSuggestedByAdmin(
      id,
      updatedPostData
    );

    if (affectedRows === 0) {
      res.status(404).json(`No record with the given id: ${id}`);
    } else {
      res.json({ message: "Post's suggestedByAdmin updated successfully" });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPostsByUsernameOrId = async (req, res) => {
  const idOrUsername = req.params.idOrUsername;
  try {
    let post;
    if (isNaN(idOrUsername)) {
      post = await postService.getPostsByUsername(idOrUsername);
    } else {
      post = await postService.getPostByAlumniId(idOrUsername);
    }

    if (!post) {
      res
        .status(404)
        .json({ error: "No record found for the given ID or username" });
    } else {
      res.send(post);
    }
  } catch (error) {
    console.error("Error fetching post by ID or username:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postService.getPostImage(id);

    const currentProfilePhotoRef = ref(storage, post.image);
        try {
          await deleteObject(currentProfilePhotoRef);
          console.log("photo deleted successfully");
        } catch (deleteError) {
          console.error("Error deleting post photo:", deleteError);
        }
    const affectedRows = await postService.deletePost(id);

    if (affectedRows === 0) {
      res.status(404).json(`No record with the given id: ${id}`);
    } else {
      res.json({ message: "Post deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPostData = req.body;

    const affectedRows = await postService.updatePost(id, updatedPostData);

    if (affectedRows === 0) {
      res.status(404).json(`No record with the given id: ${id}`);
    } else {
      res.json({ message: "Post updated successfully" });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};