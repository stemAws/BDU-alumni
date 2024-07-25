const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });


router.post("/adminEvents/:adminId", upload.single("image"), eventController.createAdminEvent);
router.get("/adminEvents", eventController.getAdminEvents);
router.get("/adminEvents/:id", eventController.getAdminEventById);
router.put("/adminEvents/:id", eventController.updateAdminEventById);
router.delete("/adminEvents/:id", eventController.deleteAdminEventById);
router.get("/events", eventController.getAllEvents);
router.get("/search-events", eventController.searchEvents)

module.exports = router;

