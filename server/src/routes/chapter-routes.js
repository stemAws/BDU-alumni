const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapter-controller");

router.post("/add-chapter", chapterController.createChapter);
router.get("/chapters-list", chapterController.getChaptersList);
router.get("/get-chapter/:chapterId", chapterController.getChapterById);
router.put("/edit-chapter/:chapterId", chapterController.updateChapter);






module.exports = router;

