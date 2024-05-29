const experienceService = require('../services/experience-services');

exports.addExperience = async (req, res) => {
    try {
        const affectedRows = await experienceService.addExperience(req.body, req.cookies.id2);
        if (affectedRows > 0) {
            res.status(201).json({ success: true, message: "Experience added successfully", affectedRows });
        } else {
            res.status(400).json({ success: false, message: "Failed to add experience" });
        }
    } catch (error) {
        console.error("Error adding experience:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

exports.updateExperience = async (req, res) => {
    try {
        const affectedRows = await experienceService.updateExperience(req.body);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Experience updated successfully.', affectedRows });
        } else {
            res.status(404).json({ success: false, message: 'Experience not found or not updated' });
        }
    } catch (error) {
        console.error("Error updating experience:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

exports.getExperience = async (req, res) => {
    try {
        const experience = await experienceService.getExperience(req.cookies.id2);

        if (experience) {
            res.status(200).json(experience);
        } else {
            res.status(404).json({ success: false, error: 'No record found for the given ID or username' });
        }
    } catch (error) {
        console.error("Error retrieving experience:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

exports.deleteExperienceById = async (req, res) => {
    try {
        const affectedRows = await experienceService.deleteExperience(req.params.experienceId);
        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Experience deleted successfully.', affectedRows });
        } else {
            res.status(404).json({ success: false, message: 'No record found for the given ID' });
        }
    } catch (error) {
        console.error("Error deleting experience:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};