const express = require('express');
const router = express.Router();
const { submitFeedback, getProjectFeedback } = require('../controllers/feedback.controller.js');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/:id/feedback', verifyToken, submitFeedback);

router.get('/:id/feedbacks', getProjectFeedback);

module.exports = router;
