const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller");
const multer = require("multer");
const { verifyToken, authRoles } = require("../middleware/auth-middleware");
const { alumni } = require("../utils/roles");

const storageEngine = multer.memoryStorage();
const upload = multer({ storage: storageEngine });
// all id are personIDs

router.post("/signin", UserController.signIn);
router.post("/check-user", UserController.checkUser);
router.post("/activate/:userId", UserController.activateAccount);
router.get("/check-auth", UserController.checkAuth);
router.post("/logout", UserController.logout);

router.post("/addUser", UserController.addUser);
router.get(
  "/alumni/:id",
  verifyToken,
  authRoles(alumni),
  UserController.getAlumniProfile
);
router.get(
  "/alumni",
  verifyToken,
  authRoles(alumni),
  UserController.getAllAlumni
);
router.delete("/alumni/:id", UserController.deleteAlumni); // needs a MW that will check if the requster is admin or not.

router.post(
  "/uploadProfilePicture",
  verifyToken,
  authRoles(alumni),
  upload.single("profilePicture"),
  UserController.uploadProfilePicture
);
router.post(
  "/uploadCoverPicture",
  verifyToken,
  authRoles(alumni),
  upload.single("coverPicture"),
  UserController.uploadCoverPicture
);
router.get(
  "/getProfilePicture/:idOrUsername",
  verifyToken,
  authRoles(alumni),
  UserController.getProfilePicture
);
router.get(
  "/getCoverPicture/:idOrUsername",
  verifyToken,
  authRoles(alumni),
  UserController.getCoverPicture
);
router.put(
  "/alumni",
  verifyToken,
  authRoles(alumni),
  UserController.updateAlumni
);
router.post(
  "/check-username",
  verifyToken,
  authRoles(alumni),
  UserController.checkUsernameAvailability
);
router.post(
  "/check-email",
  verifyToken,
  authRoles(alumni),
  UserController.checkEmailAvailability
);
router.put(
  "/change-password/:alumniID",
  verifyToken,
  authRoles(alumni),
  UserController.changePassword
);
router.get("/notable", UserController.getNotableAlumni);
router.put("/notable/:alumniId", UserController.updateNotable);
router.post("/reset-password", UserController.resetPassword);
router.post(
  "/confirm-password-change",
  verifyToken,
  authRoles(alumni),
  UserController.confirmPasswordChange
);
router.put("/updateCustom/:alumniId", UserController.updateCustomSetting);
router.post(
  "/alumni-directory",
  verifyToken,
  authRoles(alumni),
  UserController.searchAlumni
);

router.get(
  "/reserve-transcript",
  verifyToken,
  authRoles(alumni),
  UserController.reserveTranscriptPlace
);

router.post("/rs", UserController.fakeresetpass);

module.exports = router;
