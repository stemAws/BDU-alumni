const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });


router.post("/add-news/:adminId", upload.single("image"), newsController.createNews);


module.exports = router;

