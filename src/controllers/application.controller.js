const Application  = require('../models/application.model');
const Project  = require('../models/project.model');


const applyToProject = async (req, res) => {
    try {
     
      const volunteerId = req.body.volunteerId;  
      
      if (!volunteerId) {
        return res.status(400).json({ message: 'Volunteer ID is required' });
      }
  
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      if (project.status !== 'open') {
        return res.status(400).json({ message: 'Project is not accepting applications' });
      }
  
      const existingApplication = await Application.findOne({
        volunteer: volunteerId,
        project: project._id,
      });
  
      if (existingApplication) {
        return res.status(400).json({ message: 'Already applied to this project' });
      }
  
      const application = await Application.create({
        volunteer: volunteerId,
        project: project._id,
        message: req.body.message,
      });
  
      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ volunteer: req.volunteer.id })
      .populate('project', 'title description status')
      .sort('-appliedAt');

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Function to get the status of a specific application
const getApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.idCandidature,
      volunteer: req.volunteer.id,
    }).populate('project', 'title');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  applyToProject,
  getMyApplications,
  getApplicationStatus,
};
