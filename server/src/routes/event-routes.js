const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  verifyToken,
  authRoles,
  verifyRefreshToken,
} = require("../middleware/auth-middleware");
const { admin } = require("../utils/roles");

router.get(
  "/adminEvents",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  eventController.getAdminEvents
);

router.post(
  "/adminEvents",
  upload.single("image"),
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  eventController.createAdminEvent
);

router.get(
  "/adminEvents/:id",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  eventController.getAdminEventById
);
router.put(
  "/adminEvents/:id",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  eventController.updateAdminEventById
);
router.delete(
  "/adminEvents/:eventId",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  eventController.deleteAdminEventById
);
router.get("/events", eventController.getAllEvents);
router.get("/search-events", eventController.searchEvents);

module.exports = router;
