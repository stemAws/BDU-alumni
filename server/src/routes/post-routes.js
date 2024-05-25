const express = require("express");
const multer = require("multer");
const postController = require("../controllers/post-controller");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/posts/:alumniId", upload.single("image"), postController.createPost);
router.get("/posts", postController.getAllPosts);
router.get("/addedPosts", postController.getAddedStories);
router.put("/addedPosts/:postId", postController.updateSuggestedByAdmin);
router.get("/posts/:alumniIdOrUsername", postController.getPostsByUsernameOrId);
router.delete("/posts/:postId", postController.deletePost);
router.put("/posts/:postId", postController.updatePost);

module.exports = router;