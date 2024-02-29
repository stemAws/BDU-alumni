const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education-controller');
const { verifyToken } = require("../middleware/auth-middleware");

router.post('/education', verifyToken, educationController.addEducation);
router.put('/education', verifyToken, educationController.updateEducation);
router.delete('/education/:id', verifyToken, educationController.deleteEducationById);
router.get('/education/:alumniID', educationController.getEducation);

module.exports = router;