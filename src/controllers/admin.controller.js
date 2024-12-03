const Project = require('../models/project.model');
const Volunteer = require('../models/volunteer.model');
const Application = require('../models/application.model');

// Render dashboard with statistics
const renderDashboard = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalVolunteers = await Volunteer.countDocuments();
    const totalApplications = await Application.countDocuments();
    res.render('admin/dashboard', {
      totalProjects,
      totalVolunteers,
      totalApplications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading dashboard');
  }
};

// Render projects page
const renderProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.render('admin/projects', { projects });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading projects');
  }
};

// Render volunteers page
const renderVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.render('admin/volunteers', { volunteers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading volunteers');
  }
};

// Render applications page
const renderApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('volunteer') 
      .populate('project');   
    
    res.render('admin/applications', { applications });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading applications');
  }
};

module.exports = {
  renderDashboard,
  renderProjects,
  renderVolunteers,
  renderApplications,
};
