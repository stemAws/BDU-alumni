const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/alumni", UserController.getAllAlumni);
router.post("/alumni", UserController.addAlumni);
router.get("/alumni/profile/:id", UserController.getAlumniProfile);
router.post("/alumni/signin", UserController.alumniSignIn);
router.post("/admin/signin", UserController.adminSignIn);
router.post("/api/uploadProfilePicture/:id", upload.single('profilePicture'), UserController.uploadProfilePicture);
router.post("/api/uploadCoverPicture/:id", upload.single('coverPicture'), UserController.uploadCoverPicture);
router.get("/api/getProfilePicture/:idOrUsername", UserController.getProfilePicture);
router.get("/api/getCoverPicture/:idOrUsername", UserController.getCoverPicture);
router.get("/alumni/:username", UserController.getAlumniByUsername);
router.put("/alumni/:id", UserController.updateAlumni);
router.post("/check-username/:alumniID?", UserController.checkUsernameAvailability);
router.post("/check-email/:alumniID?", UserController.checkEmailAvailability);
router.post("/check-password/:alumniID", UserController.checkPassword);
router.put("/change-password/:alumniID", UserController.changePassword);
router.get("/notable", UserController.getNotableAlumni);
router.put("/notable/:alumniID", UserController.updateNotable);
router.post("/reset-password", UserController.resetPassword);

module.exports = router;