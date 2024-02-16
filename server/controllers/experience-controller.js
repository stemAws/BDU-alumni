const experienceService = require('../services/experience-services');

exports.getExperienceByIdOrUsername = async (req, res) => {
    const idOrUsername = req.params.idOrUsername;

    try {
        let experience;
        if (isNaN(idOrUsername)) {
            experience = await experienceService.getExperienceByUsername(idOrUsername);
        } else {
            experience = await experienceService.getExperienceById(idOrUsername);
        }

        if (!experience) {
            res.status(404).json({ error: 'No record found for the given ID or username' });
        } else {
            res.send(experience);
        }
    } catch (error) {
        console.error("Error fetching experience by ID or username:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteExperienceById = async (req, res) => {
    try {
        const affectedRows = await experienceService.deleteExperience(req.params.id);
        if (affectedRows === 0)
            res.status(404).json('No record by the given id');
        else
            res.send('Experience deleted.');
    } catch (error) {
        console.error("Error deleting experience:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.addExperience = async (req, res) => {
    try {
        const affectedRows = await experienceService.addExperience(req.body);
        res.status(201).json({ message: "Experience added successfully", affectedRows });
    } catch (error) {
        console.error("Error adding experience:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateExperienceById = async (req, res) => {
    try {
        const { experienceID } = req.params;
        const updateResult = await experienceService.updateExperience({ experienceID, ...req.body });

        if (updateResult) {
            res.status(200).json({ success: true, message: 'Experience updated successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'Experience not found or not updated.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};