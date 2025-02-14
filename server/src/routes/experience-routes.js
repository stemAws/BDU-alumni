const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experience-controller");
const { verifyToken, authRoles } = require("../middleware/auth-middleware");
const { alumni } = require("../utils/roles");

router.post(
  "/experiences",
  verifyToken,
  authRoles(alumni),
  experienceController.addExperience
);
router.put(
  "/experiences",
  verifyToken,
  authRoles(alumni),
  experienceController.updateExperience
);
router.delete(
  "/experiences/:experienceId",
  verifyToken,
  authRoles(alumni),
  experienceController.deleteExperienceById
);
router.get(
  "/experiences/:idorusername",
  verifyToken,
  authRoles(alumni),
  experienceController.getExperience
);

module.exports = router;
