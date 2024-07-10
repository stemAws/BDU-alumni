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
  const [chapter] = await db.query(`SELECT * from chapters`);

  return chapter;
};

exports.getAChapter = async (chapterId) => {
  const [chapter] = await db.query(
    `SELECT chapterName, description, website, DATE_FORMAT(createdAt, '%Y-%m-%d'),DATE_FORMAT(updatedAt, '%Y-%m-%d') AS updatedAt FROM chapters WHERE chapterId = ?`,
    [chapterId]
  );

  return chapter.length > 0 ? chapter[0] : null;
};

exports.updateAChapter = async (chapterId, updateChapter) => {
  const { title, description, link } = updateChapter;

  const [result] = await db.query(
    `   UPDATE chapters
        SET
          chapterName = ?,
          description =?,
          website = ?
        WHERE
          chapterId = ?
    `,
    [title, description, link, chapterId]
  );

  return result.affectedRows;
};

exports.deleteAChapter = async (chapterId) => {
  const [result] = await db.query("DELETE FROM chapters WHERE chapterId = ?", [
    chapterId,
  ]);

  if (result.affectedRows === 0) {
    return { success: false, message: "No record by the given id" };
  }

  return { success: true, message: "Chapter deleted successfully" };
};


