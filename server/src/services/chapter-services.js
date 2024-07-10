
const db = require("../config/db");

exports.addChapters = async (title, description, link) => {
  try {
    let query, params;

    query =
      "INSERT INTO chapters (chapterName, description, website ) VALUES (?, ?, ?)";
    params = [title, description, link];

    const [result] = await db.query(query, params);

    return result.insertId;
  } catch (error) {
    console.error("Error adding chapters:", error);
    throw error;
  }
};
