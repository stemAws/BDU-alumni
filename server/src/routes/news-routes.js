const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { verifyToken, authRoles } = require("../middleware/auth-middleware");
const { admin } = require("../utils/roles");

router.post(
  "/add-news",
  upload.single("image"),
  verifyToken,
  authRoles(admin),
  newsController.createNews
);
router.get("/all-news", newsController.getAllNews);
// router.get("/news-list", newsController.getNewsList);
router.get(
  "/get-news/:newsId",
  verifyToken,
  authRoles(admin),
  newsController.getNewsById
);
router.get(
  "/search-news",
  verifyToken,
  authRoles(admin),
  newsController.searchNews
);
router.put(
  "/edit-news/:newsId",
  verifyToken,
  authRoles(admin),
  newsController.updateNews
);
router.delete(
  "/delete-news/:newsId",
  verifyToken,
  authRoles(admin),
  newsController.deleteNews
);

module.exports = router;
