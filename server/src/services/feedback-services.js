// Import the database module
const db = require('../config/db');

// Add feedback to the feedback table
const addFeedback = async (fullName, email, message) => {
    try {
        const [result] = await db.query(
            'INSERT INTO feedback (fullName, email, message) VALUES (?, ?, ?)',
            [fullName, email, message]
        );

        return result.insertId;
    } catch (error) {
        console.error('Error adding feedback:', error);
        throw error;
    }
};

// Retrieve all feedback entries from the feedback table
const getAllfeedback = async () => {
    const [feedback] = await db.query(`SELECT *, DATE_FORMAT(sendAT, '%Y-%m-%d') AS sendAT
    FROM feedback`);    
    return feedback;
};

// Delete feedback by feedBackID
const deleteFeedback = async (feedBackID) => {
    const [result] = await db.query("DELETE FROM feedback WHERE feedBackID = ?", [feedBackID]);

    if (result.affectedRows === 0) {
        return { success: false, message: 'No record by the given id' };
    }

    return { success: true, message: 'Feedback deleted successfully' };
};

// Export the functions
module.exports = {
    addFeedback, 
    getAllfeedback, 
    deleteFeedback
};