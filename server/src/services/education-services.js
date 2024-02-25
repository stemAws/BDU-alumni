const db = require('../config/db');

exports.getEducationById = async (id) => {
    const [education] = await db.query(`
        SELECT 
            educationID,
            alumniID,
            institution,
            degree,
            fieldOfStudy,
            DATE_FORMAT(startYear, '%Y-%m-%d') AS startYear,
            DATE_FORMAT(endYear, '%Y-%m-%d') AS endYear,
            stillLearning
        FROM education 
        WHERE alumniID = ?
    `, [id]);

    return education;
};

exports.getEducationByUsername = async (username) => {
    try {
        const [education] = await db.query(`
            SELECT 
                E.*,
                DATE_FORMAT(E.startYear, '%Y-%m-%d') AS startYear,
                DATE_FORMAT(E.endYear, '%Y-%m-%d') AS endYear
            FROM education E
            JOIN alumni A ON E.alumniID = A.alumniID
            WHERE A.username = ?
        `, [username]);

        return education;
    } catch (error) {
        console.error('Error fetching education by username:', error);
        throw error;
    }
};

exports.deleteEducation = async (id) => {
    const { affectedRows } = await db.query("DELETE FROM education WHERE educationID = ?", [id]);

    if (affectedRows === 0) {
        throw new Error(`No record found with educationID ${id}`);
    }

    return affectedRows;
};

exports.addEducation = async (education) => {
    const { affectedRows } = await db.query("INSERT INTO education (alumniID, institution, degree, fieldOfStudy, startYear, endYear, stillLearning) VALUES (?, ?, ?, ?, ?, ?, ?)", [
        education.token,
        education.institution,
        education.degree,
        education.fieldOfStudy,
        education.startDate,
        education.endDate || null,
        education.stillLearning
    ]);

    return affectedRows;
};

exports.updateEducation = async (educationID, education) => {
    const affectedRows  = await db.query("UPDATE education SET institution = ?, degree = ?, fieldOfStudy = ?, startYear = ?, endYear = ?, stillLearning = ? WHERE educationID = ?", [
        education.institution,
        education.degree,
        education.fieldOfStudy,
        education.startYear,
        education.endYear || null,
        education.stillLearning,
        educationID
    ]);

    if (affectedRows === 0) {
        throw new Error(`No record found with educationID ${educationID}`);
    }

    return affectedRows;
};