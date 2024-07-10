
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


exports.chaptersList = async () => {
  const [chapter] = await db.query(
    `SELECT * from chapters`
  );

  return chapter;
};

exports.getAChapter = async (chapterId) => {
  const [chapter] = await db.query(
    `SELECT chapterName, description, website, DATE_FORMAT(createdAt, '%Y-%m-%d'),DATE_FORMAT(updatedAt, '%Y-%m-%d') AS updatedAt FROM chapters WHERE chapterId = ?`,
    [chapterId]
  );

  return chapter.length > 0 ? chapter[0] : null;
};

