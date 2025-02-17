const express = require("express");
const router = express.Router();
const educationController = require("../controllers/education-controller");
const {
  verifyToken,
  authRoles,
  verifyRefreshToken,
} = require("../middleware/auth-middleware");
const { alumni } = require("../utils/roles");

router.post(
  "/education",
  verifyToken,
  verifyRefreshToken,
  authRoles(alumni),
  educationController.addEducation
);
router.put(
  "/education",
  verifyToken,
  verifyRefreshToken,
  authRoles(alumni),
  educationController.updateEducation
);
router.delete(
  "/education/:id",
  verifyToken,
  verifyRefreshToken,
  authRoles(alumni),
  educationController.deleteEducationById
);
router.get(
  "/education/:idorusername",
  verifyToken,
  verifyRefreshToken,
  authRoles(alumni),
  educationController.getEducation
);

module.exports = router;
