const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experience-controller');

router.get('/experiences/:idOrUsername', experienceController.getExperienceByIdOrUsername);
router.delete('/experiences/:id', experienceController.deleteExperienceById);
router.post('/experiences', experienceController.addExperience);
router.put('/experiences/:experienceID', experienceController.updateExperienceById);

module.exports = router;
