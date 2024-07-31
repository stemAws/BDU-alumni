const db = require("../config/db");

exports.addNews = async (title, description, image_path) => {
  try {
    let query, params;

    if (image_path) {
      query = "INSERT INTO News (title, content, imagePath) VALUES (?, ?, ?)";
      params = [title, description, image_path];
    } else {
      query = "INSERT INTO News (title, content) VALUES (?, ?)";
      params = [title, description];
    }

    const [result] = await db.query(query, params);

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

exports.NewsList = async () => {
  const [news] = await db.query(
    `SELECT title, fullName FROM News n JOIN websiteadmin w JOIN person p WHERE n.adminId = w.adminId AND p.personId = w.personId`
  );

  return news;
};

exports.getANews = async (newsId) => {
  const [news] = await db.query(
    `SELECT *, DATE_FORMAT(createdAt, '%Y-%m-%d') AS createdAt FROM News WHERE newsId = ?`,
    [newsId]
  );

  return news.length > 0 ? news[0] : null;
};

exports.updateANews = async (newsId, updatedNews) => {
  const { title, content } = updatedNews;

  const [result] = await db.query(
    `   UPDATE News
        SET
          title = ?,
          content =?
        WHERE
          newsId = ?
    `,
    [title, content, newsId]
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
