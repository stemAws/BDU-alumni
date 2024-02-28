const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experience-controller');

router.post('/experiences', experienceController.addExperience);
router.put('/experiences', experienceController.updateExperience);
router.get('/experiences/:alumniId', experienceController.getExperience);
router.delete('/experiences/:experienceId', experienceController.deleteExperienceById);

module.exports = router;