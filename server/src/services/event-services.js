const db = require("../config/db");
const alumniService = require("./user-services");

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
    let query, params;

    if (image_path) {
      query =
        "INSERT INTO Event (title, content, startDate, endDate, organizer, eventLink, category, eventLocation, imagePath) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      params = [
        title,
        content,
        startDate,
        endDate,
        organizer,
        eventLink,
        category,
        eventLocation,
        image_path,
      ];
    } else {
      query =
        "INSERT INTO Event (title, content, startDate, endDate, organizer, eventLink, category, eventLocation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      params = [
        title,
        content,
        startDate,
        endDate,
        organizer,
        eventLink,
        category,
        eventLocation,
      ];
    }

    const subContent =
      content.length > 180 ? content.substring(0, 180) + "..." : content;
    const [result] = await db.query(query, params);

    const emailContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #037cd3; text-align: center;">${title}</h2>
          <p style="font-size: 16px; color: #333;">Dear Subscriber,</p>
          <p style="font-size: 14px; color: #555;">${subContent}</p>
          <p style="font-size: 14px; color: #555;"><strong>Date:</strong> ${startDate} - ${endDate}</p>
          <p style="font-size: 14px; color: #555;"><strong>Location:</strong> ${eventLocation}</p>
          <p style="font-size: 14px; color: #555;"><strong>Organizer:</strong> ${organizer}</p>
          <a href="${
            eventLink || process.env.FRONTEND_URL
          }" style="display: block; width: 200px; margin: 20px auto; padding: 10px; background: #037cd3; color: white; text-align: center; text-decoration: none; border-radius: 5px;">View Event Details</a>
          <p style="text-align: center; font-size: 12px; color: #888;">
            If you have any questions, contact us at 
            <a href="${
              process.env.FRONTEND_URL
            }/contactus" style="color: #037cd3; text-decoration: none;">our contact page</a>.
          </p>        
          <p style="text-align: center; font-size: 12px; color: #888;"> If you don't want to receive updates, 
            <a href="${
              process.env.FRONTEND_URL
            }/unsubscribe" style="color: #037cd3; text-decoration: none;">unsubscribe</a>.
          </p>
        </div>
      </div>`;

    if (result.insertId) {
      const subscribers = await alumniService.getSubscribers();

      if (subscribers.length > 0) {
        const emailSubject = `New Event: ${title}`;
        const emailBody = `Hello,\n\nA new event "${title}" has been added.\n\nDetails:\n${content}\n\nDate: ${startDate} - ${endDate}\nLocation: ${eventLocation}\nOrganizer: ${organizer}\nLink: ${eventLink}\n\nStay updated with more events!\n\nBest,\nAlumni Association`;

        await alumniService.sendEmail(
          subscribers,
          emailSubject,
          emailBody,
          emailContent
        );
      }
    }

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
