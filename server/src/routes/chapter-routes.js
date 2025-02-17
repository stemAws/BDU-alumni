const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapter-controller");

const {
  verifyToken,
  authRoles,
  verifyRefreshToken,
} = require("../middleware/auth-middleware");
const { admin, all } = require("../utils/roles");

router.post(
  "/add-chapter",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  chapterController.createChapter
);
router.get(
  "/list-chapters",
  verifyToken,
  verifyRefreshToken,
  authRoles(all),
  chapterController.getChaptersList
);
router.get(
  "/get-chapter/:chapterId",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  chapterController.getChapterById
);
router.put(
  "/edit-chapter/:chapterId",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  chapterController.updateChapter
);
router.delete(
  "/delete-chapter/:chapterId",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  chapterController.deleteChapter
);

module.exports = router;
