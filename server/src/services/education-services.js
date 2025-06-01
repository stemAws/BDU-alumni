const db = require("../config/db");
const alumniService = require("../services/user-services");

exports.addEducation = async (education, alumniId) => {
  const { affectedRows } = await db.query(
    "INSERT INTO Education (alumniId, institution, degree, major, minor, admission, graduatingYear, awards, researchPublications) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      alumniId,
      education.institution,
      education.degree,
      education.major,
      education.minor,
      education.admission,
      education.graduatingYear,
      education.awards,
      education.researchPublications,
    ]
  );

  return affectedRows;
};

exports.updateEducation = async (education) => {
  const affectedRows = await db.query(
    "UPDATE Education SET institution = ?, degree = ?, major = ?, minor = ?, admission = ?, graduatingYear = ?, awards = ?, researchPublications = ? WHERE educationId = ?",
    [
      education.institution,
      education.degree,
      education.major,
      education.minor,
      education.admission,
      education.graduatingYear,
      education.awards,
      education.researchPublications,
      education.educationID,
    ]
  );

  return affectedRows[0].affectedRows;
};

exports.getEducation = async (idorusername) => {
  let query;
  let params;

  if (isNaN(idorusername)) {
    query = `
        SELECT e.*
        FROM Education e
        JOIN Alumni a ON e.alumniId = a.alumniId
        JOIN Person p ON a.personId = p.personId
        WHERE p.username = ?`;
    params = [idorusername];
  } else {
    const alumniId = await alumniService.respondAlumniId(idorusername);

    query = `
        SELECT *
        FROM Education
        WHERE alumniId = ?`;
    params = [parseInt(alumniId, 10)];
  }

  try {
    const [education] = await db.query(query, params);
    return education;
  } catch (error) {
    console.error("Error fetching education:", error);
    throw error;
  }
};

exports.deleteEducation = async (id) => {
  const { affectedRows } = await db.query(
    "DELETE FROM Education WHERE educationID = ?",
    [id]
  );

  if (affectedRows === 0) {
    throw new Error(`No record found with educationID ${id}`);
  }

  return affectedRows;
};
