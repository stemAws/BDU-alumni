const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller");
const multer = require("multer");
const { verifyToken } = require("../middleware/auth-middleware");

const upload = multer({ storage: multer.memoryStorage() });

// all id are personIDs

router.post("/addUser", UserController.addUser);
router.post("/signin", UserController.signIn);
router.get("/alumni/:id", verifyToken, UserController.getAlumniProfile);
router.get("/alumni", verifyToken, UserController.getAllAlumni);
router.delete("/alumni/:id", UserController.deleteAlumni); // needs a MW that will check if the requster is admin or not.

router.post(
  "/uploadProfilePicture/:id",
  verifyToken,
  upload.single("profilePicture"),
  UserController.uploadProfilePicture
);
router.post(
  "/uploadCoverPicture/:id",
  verifyToken,
  upload.single("coverPicture"),
  UserController.uploadCoverPicture
);
router.get(
  "/getProfilePicture/:idOrUsername",
  verifyToken,
  UserController.getProfilePicture
);
router.get(
  "/getCoverPicture/:idOrUsername",
  verifyToken,
  UserController.getCoverPicture
);
router.put("/alumni/:id", verifyToken, UserController.updateAlumni);
router.post(
  "/check-username/:alumniID?",
  UserController.checkUsernameAvailability
);
router.post("/check-email/:alumniID?", UserController.checkEmailAvailability);
router.put(
  "/change-password/:alumniID",
  verifyToken,
  UserController.changePassword
);
router.get("/notable", UserController.getNotableAlumni);
router.put("/notable/:alumniID", UserController.updateNotable);
router.post("/reset-password", verifyToken, UserController.resetPassword);
router.post(
  "/confirm-password-change",
  verifyToken,
  UserController.confirmPasswordChange
);
router.put("/updateCustom/:alumniId", UserController.updateCustomSetting);
router.get('/alumni-directory', UserController.searchAlumni)

module.exports = router;
