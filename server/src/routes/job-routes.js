const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/add-job/:adminId",
  upload.single("image"),
  jobController.createJob
);

module.exports = router;
