const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { verifyToken, authRoles } = require("../middleware/auth-middleware");
const { admin, all, alumni } = require("../utils/roles");

router.post(
  "/add-job",
  upload.single("image"),
  verifyToken,
  authRoles(all),
  jobController.createJob
);
router.get(
  "/job-list",
  verifyToken,
  authRoles(admin),
  jobController.getAdminJobs
);
router.get(
  "/job/:jobId",
  verifyToken,
  authRoles(all),
  jobController.getJobById
);
router.put(
  "/update-job/:jobId",
  verifyToken,
  authRoles(all),
  jobController.updateJobById
);
router.delete(
  "/delete-job/:jobId",
  verifyToken,
  authRoles(all),
  jobController.deleteJobById
);
router.get(
  "/all-jobs",
  verifyToken,
  authRoles(admin),
  jobController.getAllJobData
);
router.get("/search-jobs", jobController.searchJobs);

module.exports = router;
