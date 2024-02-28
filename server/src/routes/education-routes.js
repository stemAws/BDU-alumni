const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education-controller');

router.post('/education', educationController.addEducation);
router.put('/education', educationController.updateEducation);
router.delete('/education/:id', educationController.deleteEducationById);
router.get('/education/:alumniID', educationController.getEducation);

module.exports = router;