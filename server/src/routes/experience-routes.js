const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experience-controller');
const { verifyToken } = require("../middleware/auth-middleware");

router.post('/experiences', verifyToken, experienceController.addExperience);
router.put('/experiences', verifyToken, experienceController.updateExperience);
router.delete('/experiences/:experienceId', verifyToken, experienceController.deleteExperienceById);
router.get('/experiences/:alumniId', experienceController.getExperience); // from effeciency perspective sometimes we have to skip the get verifications.

module.exports = router;