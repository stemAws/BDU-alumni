// Import the database module
const db = require("../models/db");

const addEvent = async (
  title,
  description,
  start_date,
  end_date,
  organizer,
  image_path,
  eventLink
) => {
  try {
    let query;
    let params;

    if (image_path) {
      // If an image is provided, include the imagePath field in the query
      query =
        "INSERT INTO events (title, description, startDate, endDate, organizer, imagePath, eventLink) VALUES (?, ?, ?, ?, ?, ?, ?)";
      params = [
        title,
        description,
        start_date,
        end_date,
        organizer,
        image_path,
        eventLink,
      ];
    } else {
      // If no image is provided, exclude the imagePath field from the query
      query =
        "INSERT INTO events (title, description, startDate, endDate, organizer, eventLink) VALUES (?, ?, ?, ?, ?, ?)";
      params = [title, description, start_date, end_date, organizer, eventLink];
    }

    const [result] = await db.query(query, params);

    return result.insertId;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

// Retrieve all events from the events table
const getAllEvents = async () => {
  const [events] =
    await db.query(`SELECT *, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate,
  DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate FROM events`);
  return events;
};

// Retrieve specific details of events (eventId, title, startDate, endDate, organizer) from the events table
const getEvents = async () => {
  const query = `SELECT eventId, title, 
    DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate,
    DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate,
    organizer, eventLink, createdAt FROM events`;
  const [events] = await db.query(query);
  return events;
};

// Retrieve details of a specific event by eventId
const getEventById = async (eventID) => {
  const [events] = await db.query(
    `SELECT *, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate,
  DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate FROM events WHERE eventId = ?`,
    [eventID]
  );
  return events.length > 0 ? events[0] : null;
};

// Update details of a specific event by eventId
const updateEvent = async (eventId, updatedEvent) => {
  const { title, description, startDate, endDate, organizer, eventLink } =
    updatedEvent;

  const [result] = await db.query(
    `
        UPDATE events
        SET
            title = ?,
            description = ?,
            startDate = ?,
            endDate = ?,
            organizer = ?,
            eventLink = ?
        WHERE
            eventId = ?
    `,
    [title, description, startDate, endDate, organizer, eventLink, eventId]
  );

  return result.affectedRows;
};

// Delete an event by eventId
const deleteEvent = async (eventId) => {
  const [result] = await db.query("DELETE FROM events WHERE eventId = ?", [
    eventId,
  ]);

  if (result.affectedRows === 0) {
    return { success: false, message: "No record by the given id" };
  }

  return { success: true, message: "Event deleted successfully" };
};

// Export the functions
module.exports = {
  addEvent,
  getAllEvents,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};