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

exports.getExperience = async (id) => {
  const [experience] = await db.query(
    `SELECT *
    FROM Experience
    WHERE alumniId = ?`,
    [id]
  );
  return experience;
};

exports.deleteExperience = async (id) => {
  const affectedRows = await db.query(
    "DELETE FROM Experience WHERE experienceID = ?",
    [id]
  );
  return affectedRows[0].affectedRows;
};


