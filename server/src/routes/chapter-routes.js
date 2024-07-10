const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapter-controller");

router.post("/add-chapter", chapterController.createChapter);
router.get("/chapters-list", chapterController.getChaptersList);






module.exports = router;

