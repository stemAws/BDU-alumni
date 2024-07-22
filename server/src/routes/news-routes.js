const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });


router.post("/add-news", upload.single("image"), newsController.createNews);
router.get("/all-news", newsController.getAllNews);
router.get("/news-list", newsController.getNewsList);
router.get("/get-news/:newsId", newsController.getNewsById);
router.get("/search-news", newsController.searchNews)
router.put("/edit-news/:newsId", newsController.updateNews);
router.delete("/delete-news/:newsId", newsController.deleteNews);





module.exports = router;

