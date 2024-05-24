const db = require("../config/db");

exports.addNews = async (
  title,
  content,
  category,
  image_path,
  adminId
) => {
  try {
    let query, params;

    if (image_path) {
      query =
        "INSERT INTO news (title, content,  category, imagePath, adminId) VALUES (?, ?, ?, ?, ?)";
      params = [
        title,
        content,
        anouncementDate,
        category,
        image_path,
        adminId
      ];
    } else {
      query =
      "INSERT INTO news (title, content, category, adminId) VALUES (?, ?, ?, ?)";
      params = [title, content, category, adminId];
    }

    const [result] = await db.query(query, params);

    return result.insertId;
  } catch (error) {
    console.error("Error adding news:", error);
    throw error;
  }
};

exports.getNews = async () => {
  const [events] =
    await db.query(`SELECT *, DATE_FORMAT(createdAt, '%Y-%m-%d') AS createdAt, DATE_FORMAT(updatedAt, '%Y-%m-%d') AS updatedAt FROM news`);
  return events;
};