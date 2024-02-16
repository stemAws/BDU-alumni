const feedbackService = require('../services/feedback-services');

exports.addFeedback = async (req, res) => {
    try {
      const { fullName, email, message } = req.body;

      const feedbackID = await feedbackService.addFeedback(fullName, email, message);
  
      res.status(201).json({ message: 'Feedback added successfully', feedbackID });
    } catch (error) {
      console.error('Error adding feedback:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await feedbackService.getAllfeedback();        
        res.send(feedbacks);
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

exports.deleteFeedbackById = async (req, res) => {
    try {
        const affectedRows = await feedbackService.deleteFeedback(req.params.id);
        if (affectedRows === 0)
            res.status(404).json('No record by the given id');
        else
            res.send('Feedback deleted.');
    } catch (error) {
        console.error("Error deleting feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};