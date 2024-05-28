const db = require("../config/db");

exports.addExperience = async (experience) => {
  const [[alumni]] = await db.query(
    `SELECT alumniId
    FROM Alumni
    WHERE personId = ?`,
    [experience.alumniId] // is actually personid
  );

  if (alumni && alumni.alumniId) {
    const affectedRows = await db.query(
      `INSERT INTO Experience (alumniId, position, company, industry, startDate, endDate, description, employmentType, projects, stillWorking)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        alumni.alumniId,
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
  } else {
    return 0;
  }
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
    `SELECT e.*
    FROM Experience e
    JOIN Alumni a ON e.alumniId = a.alumniId
    WHERE a.personId = ?`,
    [id]
  );
  return experience;
};

exports.deleteExperience = async (id) => {
  let affectedRows = await db.query(
    "DELETE FROM Experience WHERE experienceID = ?",
    [id]
  );
  return affectedRows[0].affectedRows;
};


