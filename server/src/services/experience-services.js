const db = require("../config/db");

exports.addExperience = async (experience) => {
  const affectedRows = await db.query(
    "INSERT INTO experience (alumniId, position, company, industry, startDate, endDate, description, employmentType, projects, stillWorking) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      experience.alumniId,
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
    "UPDATE experience SET position = ?, company = ?, industry = ?, startDate = ?, endDate = ?, description = ?, employmentType = ?, projects = ?, stillWorking = ? WHERE experienceId = ?",
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
    "SELECT * FROM experience WHERE alumniID = ?",
    [id]
  );
  return experience;
};

exports.deleteExperience = async (id) => {
  let affectedRows = await db.query(
    "DELETE FROM experience WHERE experienceID = ?",
    [id]
  );
  return affectedRows[0].affectedRows;
};


