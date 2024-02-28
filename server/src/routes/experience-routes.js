const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experience-controller');

router.post('/experiences', experienceController.addExperience);
router.put('/experiences', experienceController.updateExperience);
router.delete('/experiences/:experienceId', experienceController.deleteExperienceById);
router.get('/experiences/:alumniId', experienceController.getExperience);

module.exports = router;