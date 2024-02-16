const eventsService = require('../services/event-services');
const path = require("path");

const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const firebaseConfig = require("../firebaseConfig");
const firebsae = require("firebase/app");
firebsae.initializeApp(firebaseConfig);
const storage = getStorage();

exports.createAdminEvent = async (req, res) => {
  try {
    const { title, description, startDate, endDate, organizer, eventLink } = req.body;
    const imagePath = req.file ? `events/${Date.now()}${path.extname(req.file.originalname)}` : null;
    let downloadURL = null;

    if (req.file) {
      const fileRef = ref(storage, imagePath);
      await uploadBytes(fileRef, req.file.buffer);
      downloadURL = await getDownloadURL(fileRef);
    }

    const event = await eventsService.addEvent(title, description, startDate, endDate, organizer, downloadURL, eventLink);
    res.status(201).json({ message: "Event added successfully", event });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};

exports.getAdminEvents = async (req, res) => {
  try {
    const events = await eventsService.getEvents();
    res.send(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

exports.getAdminEventById = async (req, res) => {
  try {
    const event = await eventsService.getEventById(req.params.id);
    if (!event) res.status(404).json("No record by the given id");
    else res.send(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateAdminEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEventData = req.body;

    const affectedRows = await eventsService.updateEvent(id, updatedEventData);

    if (affectedRows === 0) {
      return res.status(404).json({ error: `No record with the given id: ${id}` });
    }

    return res.json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteAdminEventById = async (req, res) => {
  try {
    const affectedRows = await eventsService.deleteEvent(req.params.id);
    if (affectedRows === 0) res.status(404).json("No record by the given id");
    else res.send("Event deleted.");
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventsService.getAllEvents();
    res.send(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};