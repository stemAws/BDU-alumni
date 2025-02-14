const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback-controller");
const { verifyToken, authRoles } = require("../middleware/auth-middleware");
const { admin } = require("../utils/roles");

router.post("/feedback", feedbackController.addFeedback);
router.get(
  "/feedback",
  verifyToken,
  authRoles(admin),
  feedbackController.getAllFeedback
);
router.delete(
  "/feedback/:id",
  verifyToken,
  authRoles(admin),
  feedbackController.deleteFeedbackById
);

module.exports = router;
