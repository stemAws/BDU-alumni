const db = require("../config/db");
const alumniService = require("./user-services");

exports.addNews = async (title, description, category, image_path) => {
  try {
    let query, params;

    if (image_path) {
      query =
        "INSERT INTO News (title, content, category, imagePath) VALUES (?,?, ?, ?)";
      params = [title, description, category, image_path];
    } else {
      query = "INSERT INTO News (title, content,category) VALUES (?,?, ?)";
      params = [title, description, category];
    }
    const subContent =
      description.length > 180
        ? description.substring(0, 180) + "..."
        : description;
    const [result] = await db.query(query, params);
    const emailContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #037cd3; text-align: center;">${title}</h2>
        <p style="font-size: 16px; color: #333;">Dear Subscriber,</p>
        <p style="font-size: 14px; color: #555;">${subContent}</p>
        <a href="${process.env.FRONTEND_URL}" style="display: block; width: 200px; margin: 20px auto; padding: 10px; background: #037cd3; color: white; text-align: center; text-decoration: none; border-radius: 5px;">Visit Alumni Portal</a>
        <p style="text-align: center; font-size: 12px; color: #888;">
          If you have any questions, contact us at 
          <a href="${process.env.FRONTEND_URL}/contactus" style="color: #037cd3; text-decoration: none;">our contact page</a>.
        </p>        
      <p style="text-align: center; font-size: 12px; color: #888;"> If you don't want to receive updates, 
        <a href="${process.env.FRONTEND_URL}/unsubscribe" style="color: #037cd3; text-decoration: none;">unsubscribe</a>.
      </p>

      </div>
      </div>`;

    if (result.insertId) {
      const subscribers = await alumniService.getSubscribers();

      if (subscribers.length > 0) {
        const emailSubject = `News and Updates: ${title}`;
        const emailBody = `Hello,\n\nA new news article "${title}" has been published.\n\nDetails:\n${description}\n\nStay updated with more news!\n\nBest,\nAlumni Association`;

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
    console.error("Error adding news:", error);
    throw error;
  }
};

exports.getNews = async () => {
  const [news] = await db.query(
    `SELECT *, DATE_FORMAT(createdAt, '%Y-%m-%d') AS createdAt, DATE_FORMAT(updatedAt, '%Y-%m-%d') AS updatedAt FROM News`
  );

  return news;
};

// exports.NewsList = async () => {
//   const [news] = await db.query(
//     `SELECT title, category, fullName FROM News n JOIN websiteadmin w JOIN person p WHERE n.adminId = w.adminId AND p.personId = w.personId`
//   );

//   return news;
// };

exports.getANews = async (newsId) => {
  const [news] = await db.query(
    `SELECT *, DATE_FORMAT(createdAt, '%Y-%m-%d') AS createdAt FROM News WHERE newsId = ?`,
    [newsId]
  );

  return news.length > 0 ? news[0] : null;
};

exports.updateANews = async (newsId, updatedNews) => {
  const { title, content, category } = updatedNews;

  const [result] = await db.query(
    `   UPDATE News
        SET
          title = ?,
          content =?,
          category=?
        WHERE
          newsId = ?
    `,
    [title, content, category, newsId]
  );

  return result.affectedRows;
};

exports.deleteANews = async (newsId) => {
  const [result] = await db.query("DELETE FROM News WHERE newsId = ?", [
    newsId,
  ]);

  if (result.affectedRows === 0) {
    return { success: false, message: "No record by the given id" };
  }

  return { success: true, message: "News deleted successfully" };
};

exports.searchNewsBy = async (title, category) => {
  try {
    let q = `SELECT *, DATE_FORMAT(createdAt, '%Y-%m-%d') AS createdAt,
    DATE_FORMAT(updatedAt, '%Y-%m-%d') AS updatedAt FROM News WHERE title LIKE '%${title}%'`;
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
