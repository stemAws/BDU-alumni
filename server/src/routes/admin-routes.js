const express = require("express");
const adminController = require("../controllers/admin-controller");
const multer = require("multer");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  verifyToken,
  authRoles,
  verifyRefreshToken,
} = require("../middleware/auth-middleware");
const { all, admin, alumni, sysAdmin } = require("../utils/roles");

router.get(
  "/admin-list",
  verifyToken,
  verifyRefreshToken,
  authRoles(sysAdmin),
  adminController.getAdminList
);

router.put(
  "/verify-admin/:adminId",
  verifyToken,
  verifyRefreshToken,
  authRoles(sysAdmin),
  adminController.verifyAdmin
);

router.put(
  "/admin/:adminId",
  verifyToken,
  verifyRefreshToken,
  authRoles(sysAdmin),
  adminController.updateAdmin
);

router.post(
  "/upload-alumni-data",
  upload.single("file"),
  verifyToken,
  verifyRefreshToken,
  authRoles(sysAdmin),
  adminController.uploadAlumniData
);
router.get(
  "/suggested-to-admin",
  verifyRefreshToken,
  verifyToken,
  authRoles(admin),
  adminController.getSuggestedToAdmin
);
router.get(
  "/suggested-by-admin",
  verifyRefreshToken,
  verifyToken,
  authRoles(all),
  adminController.getSuggestedByAdmin
);
router.get("/geoData", verifyToken, authRoles(all), adminController.getGeoData);
router.get(
  "/userDataByCountry",
  verifyToken,
  verifyRefreshToken,
  authRoles(all),
  adminController.getUserDataByCountry
);
router.post(
  "/addDonation",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  adminController.addDonation
);
router.get(
  "/getDonations",

  adminController.getDonations
);

router.get(
  "/get-admin/:adminId",
  verifyToken,
  verifyRefreshToken,
  authRoles(sysAdmin),
  adminController.getAdmin
);
router.get(
  "/get-alumni",
  verifyToken,
  verifyRefreshToken,
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
  verifyRefreshToken,
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
  verifyRefreshToken,
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
  verifyRefreshToken,
  authRoles(admin),
  adminController.getDocRequests
);
router.put(
  "/update-status/:id",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  adminController.updateStatus
);
router.delete(
  "/delete-request/:id",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  adminController.deleteDocRequest
);

router.put(
  "/approveJob/:jobPostingId",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  adminController.approveJob
);
module.exports = router;
