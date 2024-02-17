const express = require("express");
const multer = require("multer");
const galleryController = require("../controllers/media-controller");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.array("images"), galleryController.uploadGallery);
router.get("/gallery", galleryController.getAllGalleries);
router.get("/gallery/:id", galleryController.getGalleryById);
router.delete("/gallery/:id", galleryController.deleteGalleryById);
router.put("/gallery/:id", galleryController.updateGalleryById);

module.exports = router;