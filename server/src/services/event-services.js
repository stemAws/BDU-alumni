const db = require("../config/db");

exports.addEvent = async (
  title,
  description,
  start_date,
  end_date,
  organizer,
  image_path,
  eventLink,
  category,
  eventLocation
) => {
  try {
    let query, params;

    if (image_path) {
      query =
        "INSERT INTO event (title, content, startDate, endDate, organizer, imagePath, eventLink, category, eventLocation) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)";
      params = [
        title,
        content,
        start_date,
        end_date,
        organizer,
        image_path,
        eventLink,
        category,
        eventLocation,
      ];
    } else {
      query =
        "INSERT INTO event (title, content, startDate, endDate, organizer, eventLink,category, eventLocation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      params = [title, description, start_date, end_date, organizer, eventLink, category, eventLink];
    }

    const [result] = await db.query(query, params);

    return result.insertId;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

exports.getAllEvents = async () => {
  const [events] =
    await db.query(`SELECT *, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate,
  DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate FROM event`);
  return events;
};

exports.getEvents = async () => {
  const query = `SELECT eventId, title, 
    DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate,
    DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate,
    organizer, eventLink, createdAt FROM events`;
  const [events] = await db.query(query);
  return events;
};

exports.getEventById = async (eventID) => {
  const [events] = await db.query(
    `SELECT *, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate,
  DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate FROM event WHERE eventId = ?`,
    [eventID]
  );
  return events.length > 0 ? events[0] : null;
};

exports.updateEvent = async (eventId, updatedEvent) => {
  const { title, description, startDate, endDate, organizer, eventLink,  } =
    updatedEvent;

  const [result] = await db.query(
    `
        UPDATE event
        SET
            title = ?,
            description = ?,
            startDate = ?,
            endDate = ?,
            organizer = ?,
            eventLink = ?,
            category = ?, 
            eventLink = ?
        WHERE
            eventId = ?
    `,
    [title, description, startDate, endDate, organizer, eventLink, category, eventLink, eventId]
  );

  return result.affectedRows;
};

exports.deleteEvent = async (eventId) => {
  const [result] = await db.query("DELETE FROM event WHERE eventId = ?", [
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
    DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate FROM event WHERE title LIKE '%${title}%'`;
    if (category != null) {
      q += ` AND category = "${category}"`;
    } 
    const queryResult = await db.query(q);

    return queryResult[0];
  } catch (error) {
    console.error("Error fetching alumni:", error);
    throw error;
  }
};