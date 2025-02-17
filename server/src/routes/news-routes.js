const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  verifyToken,
  authRoles,
  verifyRefreshToken,
} = require("../middleware/auth-middleware");
const { admin } = require("../utils/roles");

router.post(
  "/add-news",
  upload.single("image"),
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  newsController.createNews
);
router.get("/all-news", newsController.getAllNews);
// router.get("/news-list", newsController.getNewsList);
router.get(
  "/get-news/:newsId",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  newsController.getNewsById
);
router.get(
  "/search-news",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  newsController.searchNews
);
router.put(
  "/edit-news/:newsId",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  newsController.updateNews
);
router.delete(
  "/delete-news/:newsId",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  newsController.deleteNews
);

module.exports = router;
