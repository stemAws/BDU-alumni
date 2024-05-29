const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/add-job", upload.single("image"), jobController.createJob);
router.get("/job-list", jobController.getAdminJobs);
router.get("/job/:jobId", jobController.getJobById);
router.put("/update-job/:jobId", jobController.updateJobById);

module.exports = router;
