const db = require('../config/db');

exports.addEducation = async (education) => {
    const { affectedRows } = await db.query("INSERT INTO Education (alumniId, institution, degree, major, minor, admission, graduatingYear, awards, researchPublications) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        education.alumniId,
        education.institution,
        education.degree,
        education.major,
        education.minor,
        education.admission,
        education.graduatingYear,
        education.awards,
        education.researchPublications
    ]);        

    return affectedRows;
};

exports.updateEducation = async (education) => {
    const affectedRows = await db.query("UPDATE Education SET institution = ?, degree = ?, major = ?, minor = ?, admission = ?, graduatingYear = ?, awards = ?, researchPublications = ? WHERE educationId = ?", [
        education.institution,
        education.degree,
        education.major,
        education.minor,
        education.admission,
        education.graduatingYear,
        education.awards,
        education.researchPublications,
        education.educationID
    ]);

    return affectedRows[0].affectedRows;
};

exports.deleteEducation = async (id) => {
    const { affectedRows } = await db.query("DELETE FROM Education WHERE educationID = ?", [id]);

    if (affectedRows === 0) {
        throw new Error(`No record found with educationID ${id}`);
    }

    return affectedRows;
};

exports.getEducation = async (id) => {
    const [education] = await db.query(`
    SELECT * FROM Education WHERE alumniId = ?`, [id]);
    
    return education;
};