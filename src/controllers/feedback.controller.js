const  Application  = require('../models/application.model');
const  Project  = require('../models/project.model');

const submitFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const application = await Application.findOne({
      volunteer: req.volunteer.id,
      project: project._id,
      status: 'accepted',
    });

    if (!application) {
      return res
        .status(400)
        .json({ message: 'Not authorized to submit feedback' });
    }

    project.feedback = project.feedback || [];
    project.feedback.push({
      volunteer: req.volunteer.id,
      rating,
      comment,
      date: new Date(),
    });

    await project.save();
    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Function to get project feedback
const getProjectFeedback = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .select('feedback')
      .populate('feedback.volunteer', 'firstName lastName');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project.feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  submitFeedback,
  getProjectFeedback,
};
