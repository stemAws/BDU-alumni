const db = require("../config/db");
const alumniService = require("../services/user-services");
const shortenIndustry = (industry) => {
  switch (industry) {
    case "Healthcare and Social Assistance":
      return "Healthcare";
    case "Retail Trade":
      return "Retail";
    case "Manufacturing":
      return "Manufacturing";
    case "Educational Services":
      return "Education";
    case "Professional, Scientific, and Technical Services":
      return "Scientific";
    case "Construction":
      return "Construction";
    case "Finance and Insurance":
      return "Finance";
    case "Accommodation and Food Services":
      return "Accommodation";
    case "Information Technology":
      return "Information";
    case "Transportation and Warehousing":
      return "Transportation";
    case "Agriculture, Forestry, Fishing, and Hunting":
      return "Agriculture";
    case "Public Administration":
      return "Public Administration";
    case "Wholesale Trade":
      return "Wholesale Trade";
    case "Real Estate and Rental and Leasing":
      return "Real Estate";
    case "Arts, Entertainment, and Recreation":
      return "Arts";
    case "Mining, Quarrying, and Oil and Gas Extraction":
      return "Mining";
    case "Utilities":
      return "Utilities";
    case "Administrative and Support and Waste Management Services":
      return "Administrative";
    case "Management of Companies and Enterprises":
      return "Management";
    case "Telecommunications":
      return "Telecom";
    case "Pharmaceuticals and Biotechnology":
      return "Pharmaceuticals";
    case "Aerospace and Defense":
      return "Aerospace";
    case "Automotive":
      return "Automotive";
    case "Chemical Manufacturing":
      return "Chemical";
    case "Electronics and Electrical Equipment":
      return "Electronics";
    case "Textiles and Apparel":
      return "Textiles";
    case "Food and Beverage Manufacturing":
      return "Food";
    case "Media and Publishing":
      return "Media";
    case "Logistics and Supply Chain":
      return "Logistics";
    case "Hospitality and Tourism":
      return "Hospitality";
    case "other":
      return "other";
  }
};

exports.addExperience = async (experience, alumniId) => {
  const industry = shortenIndustry(experience.industry);

  const affectedRows = await db.query(
    `INSERT INTO Experience (alumniId, position, company, industry, startDate, endDate, description, employmentType, projects, stillWorking)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      alumniId,
      experience.position,
      experience.company,
      industry,
      experience.startDate,
      experience.endDate,
      experience.description,
      experience.employmentType,
      experience.projects,
      experience.stillWorking,
    ]
  );
  return affectedRows[0].affectedRows;
};

exports.updateExperience = async (experience) => {
  const affectedRows = await db.query(
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
      experience.experienceId,
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
    const alumniId = await alumniService.respondAlumniId(idorusername);

    query = `
      SELECT *, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate, DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate
      FROM Experience
      WHERE alumniId = ?`;
    params = [parseInt(alumniId, 10)];
  }

  try {
    const [experience] = await db.query(query, params);
    return experience;
  } catch (error) {
    console.error("Error fetching experience:", error);
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
