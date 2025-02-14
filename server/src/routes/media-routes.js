const express = require("express");
const multer = require("multer");
const galleryController = require("../controllers/media-controller");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const { verifyToken, authRoles } = require("../middleware/auth-middleware");
const { admin } = require("../utils/roles");

router.post(
  "/upload",
  upload.array("images"),
  verifyToken,
  authRoles(admin),
  galleryController.uploadGallery
);
router.get("/gallery", galleryController.getAllGalleries);
router.get("/gallery/:id", galleryController.getGalleryById);
router.delete(
  "/gallery/:id",
  verifyToken,
  authRoles(admin),
  galleryController.deleteGalleryById
);
router.put(
  "/gallery/:id",
  verifyToken,
  authRoles(admin),
  galleryController.updateGalleryById
);

module.exports = router;
