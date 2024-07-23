const db = require("../config/db");

exports.addExperience = async (experience, alumniId) => {
    const affectedRows = await db.query(
      `INSERT INTO Experience (alumniId, position, company, industry, startDate, endDate, description, employmentType, projects, stillWorking)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        alumniId,
        experience.position,
        experience.company,
        experience.industry,
        experience.startDate,
        experience.endDate,
        experience.description,
        experience.employmentType,
        experience.projects,
        experience.stillWorking
      ]
    );
    return affectedRows[0].affectedRows;
};

exports.updateExperience = async (experience) => {
  const affectedRows  = await db.query(
    "UPDATE Experience SET position = ?, company = ?, industry = ?, startDate = ?, endDate = ?, description = ?, employmentType = ?, projects = ?, stillWorking = ? WHERE experienceId = ?",
    [
      experience.position,
      experience.company,
      experience.industry,
      experience.startDate,
      experience.endDate,
      experience.description,
      experience.employmentType,
      experience.projects,
      experience.stillWorking,
      experience.experienceId
    ]
  );

  return affectedRows[0].affectedRows;
};

exports.getExperience = async (idorusername) => {
  let query;
  let params;

  if (isNaN(idorusername)) {
    query = `
      SELECT e.*
      FROM Experience e
      JOIN Alumni a ON e.alumniId = a.alumniId
      JOIN Person p ON a.personId = p.personId
      WHERE p.username = ?`;
    params = [idorusername];
  } else {
    query = `
      SELECT *
      FROM Experience
      WHERE alumniId = ?`;
    params = [parseInt(idorusername, 10)];
  }

  try {
    const [experience] = await db.query(query, params);
    return experience;
  } catch (error) {
    console.error('Error fetching experience:', error);
    throw error;
  }
};


exports.deleteExperience = async (id) => {
  const affectedRows = await db.query(
    "DELETE FROM Experience WHERE experienceID = ?",
    [id]
  );
  return affectedRows[0].affectedRows;
};


