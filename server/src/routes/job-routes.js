const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  verifyToken,
  authRoles,
  verifyRefreshToken,
} = require("../middleware/auth-middleware");
const { admin, all, alumni } = require("../utils/roles");

router.post(
  "/add-job",
  upload.single("image"),
  verifyToken,
  verifyRefreshToken,
  authRoles(all),
  jobController.createJob
);
router.get(
  "/job-list",
  verifyToken,
  verifyRefreshToken,
  authRoles(all),
  jobController.getAdminJobs
);
router.get(
  "/job/:jobId",
  verifyToken,
  verifyRefreshToken,
  authRoles(all),
  jobController.getJobById
);
router.put(
  "/update-job/:jobId",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  jobController.updateJobById
);
router.delete(
  "/delete-job/:jobId",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  jobController.deleteJobById
);
router.get(
  "/admin-jobs",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  jobController.getAllJobData
);
router.get("/search-jobs", jobController.searchJobs);

module.exports = router;
