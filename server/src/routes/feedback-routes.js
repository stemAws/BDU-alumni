const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback-controller');

router.post('/feedback', feedbackController.addFeedback);
router.get('/feedback', feedbackController.getAllFeedback);
router.delete('/feedback/:id', feedbackController.deleteFeedbackById);

module.exports = router;