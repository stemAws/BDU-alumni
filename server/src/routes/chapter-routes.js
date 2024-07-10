const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapter-controller");

router.post("/add-chapter", chapterController.createChapter);
router.get("/list-chapters", chapterController.getChaptersList);
router.get("/get-chapter/:chapterId", chapterController.getChapterById);
router.put("/edit-chapter/:chapterId", chapterController.updateChapter);
router.delete("/delete-chapter/:chapterId", chapterController.deleteChapter);







module.exports = router;

