const educationService = require('../services/education-services');

exports.getEducationByIdOrUsername = async (req, res) => {
    const idOrUsername = req.params.idOrUsername;

    try {
        let education;
        if (isNaN(idOrUsername)) {
            education = await educationService.getEducationByUsername(idOrUsername);
        } else {
            education = await educationService.getEducationById(idOrUsername);
        }

        if (!education) {
            res.status(404).json({ error: 'No record found for the given ID or username' });
        } else {
            res.send(education);
        }
    } catch (error) {
        console.error("Error fetching education by ID or username:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteEducationById = async (req, res) => {
    try {
        const affectedRows = await educationService.deleteEducation(req.params.id);
        if (affectedRows === 0)
            res.status(404).json({ error: 'No record found by the given id' });
        else
            res.status(200).json({ message: 'Education deleted successfully' });
    } catch (error) {
        console.error("Error deleting education:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.addEducation = async (req, res) => {
    try {
        const affectedRows = await educationService.addEducation(req.body);
        res.status(201).json({ message: "Education added successfully", affectedRows });
    } catch (error) {
        console.error("Error adding education:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateEducationById = async (req, res) => {
    try {
        const affectedRows = await educationService.updateEducation(req.params.educationID, req.body);
        if (affectedRows === 0)
            res.status(404).json({ error: 'No record found by the given id' });
        else
            res.status(200).json({ message: 'Education updated successfully', affectedRows });
    } catch (error) {
        console.error("Error updating education:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};