const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experience-controller");
const {
  verifyToken,
  authRoles,
  verifyRefreshToken,
} = require("../middleware/auth-middleware");
const { alumni } = require("../utils/roles");

router.post(
  "/experiences",
  verifyToken,
  verifyRefreshToken,
  authRoles(alumni),
  experienceController.addExperience
);
router.put(
  "/experiences",
  verifyToken,
  verifyRefreshToken,
  authRoles(alumni),
  experienceController.updateExperience
);
router.delete(
  "/experiences/:experienceId",
  verifyToken,
  verifyRefreshToken,
  authRoles(alumni),
  experienceController.deleteExperienceById
);
router.get(
  "/experiences/:idorusername",
  verifyToken,
  verifyRefreshToken,
  authRoles(alumni),
  experienceController.getExperience
);

module.exports = router;
