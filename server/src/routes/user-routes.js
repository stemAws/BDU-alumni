const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller");
const multer = require("multer");
const { verifyToken } = require("../middleware/auth-middleware");

const upload = multer({ storage: multer.memoryStorage() });

// all id are personIDs

router.post("/addUser", UserController.addUser);
router.post("/signin", UserController.signIn);
router.get("/alumni/:id", UserController.getAlumniProfile);
router.get("/alumni", UserController.getAllAlumni);

router.post("/uploadProfilePicture/:id", upload.single('profilePicture'), UserController.uploadProfilePicture);
router.post("/uploadCoverPicture/:id", upload.single('coverPicture'), UserController.uploadCoverPicture);
router.get("/getProfilePicture/:idOrUsername", UserController.getProfilePicture);
router.get("/getCoverPicture/:idOrUsername", UserController.getCoverPicture);
router.put("/alumni/:id", UserController.updateAlumni);
router.post("/check-username/:alumniID?", UserController.checkUsernameAvailability);
router.post("/check-email/:alumniID?", UserController.checkEmailAvailability);
router.put("/change-password/:alumniID", UserController.changePassword);
// router.get("/notable", UserController.getNotableAlumni);
// router.put("/notable/:alumniID", UserController.updateNotable);
router.post("/reset-password", UserController.resetPassword);
router.post("/confirm-password-change", UserController.confirmPasswordChange);

module.exports = router;