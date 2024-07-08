const postService = require("../services/post-services");
const path = require("path");
const sharp = require("sharp");

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
  const { content, suggestToAdmin, location } = req.body;
  const alumniId = req.cookies.id2;

  try {
    let downloadURL = null;

    if (req.file) {
      const filePath = `posts/${alumniId}-${Date.now()}${path.extname(
        req.file.originalname
      )}`;
      const fileRef = ref(storage, filePath);

      const resizedFile = await sharp(req.file.buffer)
        .jpeg({ quality: 40 })
        .toBuffer();

      await uploadBytes(fileRef, resizedFile);
      downloadURL = await getDownloadURL(fileRef);
    }

    const postId = await postService.createPost(
      alumniId,
      content,
      downloadURL,
      suggestToAdmin,
      location
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
    const postId = req.params.postId;
    const updatedPostData = req.body;

    const affectedRows = await postService.updateSuggestedByAdmin(
      postId,
      updatedPostData
    );

    if (affectedRows === 0) {
      res.status(404).json(`No record with the given id: ${postId}`);
    } else {
      res.json({ message: "Post's suggestedByAdmin updated successfully" });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPostsByUsernameOrId = async (req, res) => {
  const alumniIdOrUsername = req.params.alumniIdOrUsername;
  try {
    let post;
    if (isNaN(alumniIdOrUsername)) {
      post = await postService.getPostsByUsername(alumniIdOrUsername);
    } else {
      post = await postService.getPostByAlumniId(req.cookies.id2);
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
// exports.deletePost = async (req, res) => {
//   try {
//     const { postId } = req.params;

//     // Fetch post to get media path
//     const post = await postService.getPostImage(postId);

//     if (post) {
//       const mediaRef = ref(storage, post.mediaPath);
//       try {
//         await deleteObject(mediaRef);
//         console.log("Photo deleted successfully");
//       } catch (deleteError) {
//         console.error("Error deleting post photo:", deleteError);
//         return res.status(500).json({ error: "Error deleting post photo" });
//       }

//       // Delete post record from database
//       const affectedRows = await postService.deletePost(postId);

//       if (affectedRows === 0) {
//         res
//           .status(404)
//           .json({ message: `No record with the given id: ${postId}` });
//       } else {
//         res.json({ message: "Post deleted successfully" });
//       }
//     }
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await postService.getPostImage(postId);

    if (post?.mediaPath) {
      const mediaRef = ref(storage, post.mediaPath);
      try {
        await deleteObject(mediaRef);
        console.log("Photo deleted successfully");
      } catch (deleteError) {
        console.error("Error deleting post photo:", deleteError);
      }
    }

    const affectedRows = await postService.deletePost(postId);

    if (affectedRows === 0) {
      res.status(404).json({ message: `No record with the given id: ${postId}` });
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
    const { postId } = req.params;
    const updatedPostData = req.body;

    const affectedRows = await postService.updatePost(postId, updatedPostData);

    if (affectedRows === 0) {
      res.status(404).json(`No record with the given id: ${postId}`);
    } else {
      res.json({ message: "Post updated successfully" });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
