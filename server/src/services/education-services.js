// Import the database connection module
const db = require('../config/db');

// Function to get education information by alumni ID
const getEducationById = async (id) => {
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

// Function to get education information by username
const getEducationByUsername = async (username) => {
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


// Function to delete education record by education ID
const deleteEducation = async (id) => {
    const { affectedRows } = await db.query("DELETE FROM education WHERE educationID = ?", [id]);

    if (affectedRows === 0) {
        throw new Error(`No record found with educationID ${id}`);
    }

    return affectedRows;
};

// Function to add a new education record
const addEducation = async (education) => {
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

// Function to update an existing education record by education ID
const updateEducation = async (educationID, education) => {
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

module.exports = {
    getEducationById,
    getEducationByUsername,
    deleteEducation,
    addEducation, updateEducation
}