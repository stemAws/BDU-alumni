const db = require("../config/db");

exports.getExperienceById = async (id) => {
  const [experience] = await db.query(
    "SELECT experienceID, alumniID, jobTitle, employmentType, companyName, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate, DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate, stillWorking FROM experience WHERE alumniID = ?",
    [id]
  );
  return experience;
};

exports.getExperienceByUsername = async (username) => {
  try {
    const [experience] = await db.query(
      `
            SELECT
                E.*,
                DATE_FORMAT(E.startDate, '%Y-%m-%d') AS startDate,
                DATE_FORMAT(E.endDate, '%Y-%m-%d') AS endDate
            FROM experience E
            JOIN alumni A ON E.alumniID = A.alumniID
            WHERE A.username = ?
        `,
      [username]
    );

    return experience;
  } catch (error) {
    console.error("Error fetching experience by username:", error);
    throw error;
  }
};

exports.deleteExperience = async (id) => {
  const { affectedRows } = await db.query(
    "DELETE FROM experience WHERE experienceID = ?",
    [id]
  );
  return affectedRows;
};

exports.addExperience = async (experience) => {
  const { affectedRows } = await db.query(
    "INSERT INTO experience(alumniID, jobTitle, employmentType, companyName, startDate, endDate, stillWorking) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      experience.token,
      experience.jobTitle,
      experience.employmentType,
      experience.companyName,
      experience.startDate,
      experience.endDate || null,
      experience.stillWorking,
    ]
  );
  return affectedRows;
};

exports.updateExperience = async (experience) => {
  const affectedRows = await db.query(
    "UPDATE experience SET jobTitle = ?, employmentType = ?, companyName = ?, startDate = ?, endDate = ?, stillWorking = ? WHERE experienceID = ?",
    [
      experience.jobTitle,
      experience.employmentType,
      experience.companyName,
      experience.startDate,
      experience.endDate || null,
      experience.stillWorking,
      experience.experienceID,
    ]
  );
  console.log(affectedRows);
  return affectedRows;
};