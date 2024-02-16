// Import the database connection module
const db = require("../db");

// Function to get education information by alumni ID
const getExperienceById = async (id) => {
  const [experience] = await db.query(
    "SELECT experienceID, alumniID, jobTitle, employmentType, companyName, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate, DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate, stillWorking FROM experience WHERE alumniID = ?",
    [id]
  );
  return experience;
};

const getExperienceByUsername = async (username) => {
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

// Function to delete education record by education ID
const deleteExperience = async (id) => {
  const { affectedRows } = await db.query(
    "DELETE FROM experience WHERE experienceID = ?",
    [id]
  );
  return affectedRows;
};

// Function to add a new education record
const addExperience = async (experience) => {
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

// Function to update an existing education record by education ID
const updateExperience = async (experience) => {
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

// Export the functions
module.exports = {
  getExperienceById,
  getExperienceByUsername,
  addExperience,
  updateExperience,
  deleteExperience,
};