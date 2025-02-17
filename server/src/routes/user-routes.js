const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller");
const multer = require("multer");
const {
  verifyToken,
  authRoles,
  refreshToken,
  verifyRefreshToken,
} = require("../middleware/auth-middleware");
const { alumni, sysAdmin } = require("../utils/roles");

const storageEngine = multer.memoryStorage();
const upload = multer({ storage: storageEngine });
// all id are personIDs

router.post("/signin", UserController.signIn);
router.post("/check-user", UserController.checkUser);
router.post("/activate/:userId", UserController.activateAccount);
router.get("/check-auth", UserController.checkAuth);
router.post("/logout", UserController.logout);
router.post("/refresh-token", refreshToken);

router.post(
  "/addUser",
  verifyToken,
  verifyRefreshToken,
  authRoles(sysAdmin),
  UserController.addUser
);
router.get(
  "/alumni/:id",
  verifyToken,
  verifyRefreshToken,
  authRoles(alumni),
  UserController.getAlumniProfile
);
router.get(
  "/alumni",
  verifyToken,
  verifyRefreshToken,

  authRoles(alumni),
  UserController.getAllAlumni
);
router.delete("/alumni/:id", UserController.deleteAlumni); // needs a MW that will check if the requster is admin or not.

router.post(
  "/uploadProfilePicture",
  verifyToken,
  verifyRefreshToken,

  authRoles(alumni),
  upload.single("profilePicture"),
  UserController.uploadProfilePicture
);
router.post(
  "/uploadCoverPicture",
  verifyRefreshToken,

  verifyToken,
  authRoles(alumni),
  upload.single("coverPicture"),
  UserController.uploadCoverPicture
);
router.get(
  "/getProfilePicture/:userId",
  verifyRefreshToken,

  verifyToken,
  authRoles(alumni),
  UserController.getProfilePicture
);
router.get(
  "/getCoverPicture/:idOrUsername",
  verifyRefreshToken,

  verifyToken,
  authRoles(alumni),
  UserController.getCoverPicture
);
router.put(
  "/alumni",
  verifyRefreshToken,

  verifyToken,
  authRoles(alumni),
  UserController.updateAlumni
);
router.post(
  "/check-username",
  verifyRefreshToken,

  verifyToken,
  authRoles(alumni),
  UserController.checkUsernameAvailability
);
router.post(
  "/check-email",
  verifyRefreshToken,

  verifyToken,
  authRoles(alumni),
  UserController.checkEmailAvailability
);
router.put(
  "/change-password/:alumniID",
  verifyRefreshToken,

  verifyToken,
  authRoles(alumni),
  UserController.changePassword
);
router.get("/notable", UserController.getNotableAlumni);
router.put(
  "/notable/:alumniId",
  verifyRefreshToken,
  verifyToken,
  authRoles(sysAdmin),
  UserController.updateNotable
);
router.post("/reset-password", UserController.resetPassword);
router.post(
  "/confirm-password-change",
  verifyRefreshToken,

  verifyToken,
  authRoles(alumni),
  UserController.confirmPasswordChange
);
router.put("/updateCustom/:alumniId", UserController.updateCustomSetting);
router.post("/alumni-directory", UserController.searchAlumni);

router.get(
  "/reserve-transcript",
  verifyRefreshToken,

  verifyToken,
  authRoles(alumni),
  UserController.reserveTranscriptPlace
);

router.post("/rs", UserController.fakeresetpass);

module.exports = router;
