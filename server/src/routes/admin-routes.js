const express = require("express");
const adminController = require("../controllers/admin-controller");
const multer = require("multer");
const { verifyToken } = require("../middleware/auth-middleware");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/upload-alumni-data",
  upload.single("file"),
  adminController.uploadAlumniData
);
router.get("/suggested-to-admin", adminController.getSuggestedToAdmin);
router.get("/suggested-by-admin", adminController.getSuggestedByAdmin);
router.get("/geoData", verifyToken, adminController.getGeoData);
router.get("/userDataByCountry", adminController.getUserDataByCountry);
router.post("/addDonation", adminController.addDonation);
router.get("/getDonations", adminController.getDonations);
router.get("/get-alumni", adminController.getAlumni);
router.get("/degree-count", adminController.getDegree);
router.get("/admission-count", adminController.getAdmission);
// router.get("/job-suggested", adminController.getSuggestedJob);
router.put("/update-post/:postId", adminController.updatePost)
router.get("/majors-count", adminController.getMajors);
router.get("/job-count", adminController.getJob);
router.get("/industry-count", adminController.getIndustry);
router.get("/company-count", adminController.getCompany);
router.put("/verify-alumni/:alumniId", adminController.veifyAlumni);
router.get("/grad-year", adminController.getGradYear);
router.get("/doc-requests", adminController.getDocRequests);
router.put("/update-status/:id", adminController.updateStatus);
router.delete("/delete-request/:id", adminController.deleteDocRequest);

router.put("/approveJob/:jobPostingId", adminController.approveJob);
module.exports = router;

