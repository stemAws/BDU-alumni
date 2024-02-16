const express = require("express");
const multer = require("multer");
const postController = require("../controllers/post-controller");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/posts/:alumniID", upload.single("image"), postController.createPost);
router.get("/posts", postController.getAllPosts);
router.get("/addedPosts", postController.getAddedStories);
router.put("/addedPosts/:id", postController.updateSuggestedByAdmin);
router.get("/posts/:idOrUsername", postController.getPostsByUsernameOrId);
router.delete("/posts/:id", postController.deletePost);
router.put("/posts/:id", postController.updatePost);

module.exports = router;