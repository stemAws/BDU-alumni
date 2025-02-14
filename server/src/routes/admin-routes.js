const express = require("express");
const adminController = require("../controllers/admin-controller");
const multer = require("multer");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { verifyToken, authRoles } = require("../middleware/auth-middleware");
const { all, admin, alumni, sysAdmin } = require("../utils/roles");

router.post(
  "/upload-alumni-data",
  upload.single("file"),
  verifyToken,
  authRoles(sysAdmin),
  adminController.uploadAlumniData
);
router.get(
  "/suggested-to-admin",
  verifyToken,
  authRoles(admin),
  adminController.getSuggestedToAdmin
);
router.get(
  "/suggested-by-admin",
  verifyToken,
  authRoles(all),
  adminController.getSuggestedByAdmin
);
router.get("/geoData", verifyToken, authRoles(all), adminController.getGeoData);
router.get(
  "/userDataByCountry",
  verifyToken,
  authRoles(all),
  adminController.getUserDataByCountry
);
router.post(
  "/addDonation",
  verifyToken,
  authRoles(admin),
  adminController.addDonation
);
router.get(
  "/getDonations",

  adminController.getDonations
);
router.get(
  "/get-alumni",
  verifyToken,
  authRoles(sysAdmin),
  adminController.getAlumni
);
router.get(
  "/degree-count",

  adminController.getDegree
);
router.get(
  "/admission-count",

  adminController.getAdmission
);
// router.get("/job-suggested", adminController.getSuggestedJob);
router.put(
  "/update-post/:postId",
  verifyToken,
  authRoles(admin),
  adminController.updatePost
);
router.get(
  "/majors-count",

  adminController.getMajors
);
router.get("/job-count", adminController.getJob);
router.get(
  "/industry-count",

  adminController.getIndustry
);
router.get(
  "/company-count",

  adminController.getCompany
);
router.put(
  "/verify-alumni/:alumniId",
  verifyToken,
  authRoles(sysAdmin),
  adminController.veifyAlumni
);
router.get(
  "/grad-year",

  adminController.getGradYear
);
router.get(
  "/doc-requests",
  verifyToken,
  authRoles(admin),
  adminController.getDocRequests
);
router.put(
  "/update-status/:id",
  verifyToken,
  authRoles(admin),
  adminController.updateStatus
);
router.delete(
  "/delete-request/:id",
  verifyToken,
  authRoles(admin),
  adminController.deleteDocRequest
);

router.put(
  "/approveJob/:jobPostingId",
  verifyToken,
  authRoles(admin),
  adminController.approveJob
);
module.exports = router;
