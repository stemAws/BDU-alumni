const db = require("../config/db");

exports.addFeedback = async (fullName, email, message) => {
  try {
    const [result] = await db.query(
      "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)",
      [fullName, email, message]
    );

    return result.insertId;
  } catch (error) {
    console.error("Error adding feedback:", error);
    throw error;
  }
};

exports.getAllfeedback = async () => {
  const [feedback] =
    await db.query(`SELECT *, DATE_FORMAT(submittedAt, '%Y-%m-%d') AS submittedAt
    FROM feedback`);
  return feedback;
};

exports.deleteFeedback = async (feedBackID) => {
  const [result] = await db.query("DELETE FROM feedback WHERE feedBackID = ?", [
    feedBackID,
  ]);

  if (result.affectedRows === 0) {
    return { success: false, message: "No record by the given id" };
  }

  return { success: true, message: "Feedback deleted successfully" };
};
