const db = require("../config/db");

exports.addEvent = async (
  image_path,
  {
    title,
    content,
    startDate,
    endDate,
    organizer,
    eventLink,
    category,
    eventLocation,
  }
) => {
  try {
    const [result] = await db.query(
      "INSERT INTO Event (title, content, startDate, endDate, organizer, eventLink, category, eventLocation, imagePath) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        content,
        startDate,
        endDate,
        organizer,
        eventLink,
        category,
        eventLocation,
        image_path,
      ]
    );

    return result.insertId;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

exports.getAllEvents = async () => {
  const [events] =
    await db.query(`SELECT *, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate,
  DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate FROM Event`);
  return events;
};

exports.getEvents = async () => {
  const query = `SELECT eventId, title, content, category,
    DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate,
    DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate,
    organizer, eventLink, createdAt FROM Event`;
  const [events] = await db.query(query);
  return events;
};

exports.getEventById = async (eventID) => {
  const [events] = await db.query(
    `SELECT *, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate,
  DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate FROM Event WHERE eventId = ?`,
    [eventID]
  );
  return events.length > 0 ? events[0] : null;
};

exports.updateEvent = async (eventId, updatedEvent) => {
  const { title, description, startDate, endDate, organizer, eventLink } =
    updatedEvent;

  const [result] = await db.query(
    `
        UPDATE Event
        SET
            title = ?,
            content = ?,
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

exports.deleteEvent = async (eventId) => {
  const [result] = await db.query("DELETE FROM Event WHERE eventId = ?", [
    eventId,
  ]);

  if (result.affectedRows === 0) {
    return { success: false, message: "No record by the given id" };
  }

  return { success: true, message: "Event deleted successfully" };
};

exports.searchEventsBy = async (title, category) => {
  try {
    let q = `SELECT *, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate,
    DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate FROM Event WHERE title LIKE '%${title}%'`;
    if (category != null) {
      q += ` AND category = "${category}"`;
    }
    const queryResult = await db.query(q);

    return queryResult[0];
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};
