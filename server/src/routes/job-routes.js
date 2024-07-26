const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { verifyToken } = require("../middleware/auth-middleware");


router.post("/add-job", verifyToken, upload.single("image"), jobController.createJob);
router.get("/job-list", verifyToken, jobController.getAdminJobs);
router.get("/job/:jobId", jobController.getJobById);
router.put("/update-job/:jobId", jobController.updateJobById);
router.delete("/delete-job/:jobId", jobController.deleteJobById);
router.get("/all-jobs", jobController.getAllJobData);
router.get("/search-jobs", jobController.searchJobs);




module.exports = router;
