const express = require("express");
const multer = require("multer");
const postController = require("../controllers/post-controller");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const { verifyToken, authRoles } = require("../middleware/auth-middleware");
const { alumni } = require("../utils/roles");

router.post(
  "/posts",
  upload.single("image"),
  verifyToken,
  authRoles(alumni),
  postController.createPost
);
router.get("/posts", postController.getAllPosts);
router.get(
  "/addedPosts",

  postController.getAddedStories
);
router.put(
  "/addedPosts/:postId",
  verifyToken,
  authRoles(alumni),
  postController.updateSuggestedByAdmin
);
router.get(
  "/posts/:alumniIdOrUsername",
  verifyToken,
  authRoles(alumni),
  postController.getPostsByUsernameOrId
);
router.delete(
  "/posts/:postId",
  verifyToken,
  authRoles(alumni),
  postController.deletePost
);
router.put(
  "/posts/:postId",
  verifyToken,
  authRoles(alumni),
  postController.updatePost
);

module.exports = router;
