const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education-controller');

router.get('/education/:idOrUsername', educationController.getEducationByIdOrUsername);
router.delete('/education/:id', educationController.deleteEducationById);
router.post('/education', educationController.addEducation);
router.put('/education/:educationID', educationController.updateEducationById);

module.exports = router;