const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event-controller");
const multer = require("multer");
const { verifyToken } = require("../middleware/auth-middleware");
const upload = multer({ storage: multer.memoryStorage() });


router.post("/adminEvents", verifyToken, upload.single("image"), eventController.createAdminEvent);
router.get("/adminEvents", eventController.getAdminEvents);
router.get("/adminEvents/:id", eventController.getAdminEventById);
router.put("/adminEvents/:id", eventController.updateAdminEventById);
router.delete("/adminEvents/:eventId", eventController.deleteAdminEventById);
router.get("/events", eventController.getAllEvents);
router.get("/search-events", eventController.searchEvents)

module.exports = router;

