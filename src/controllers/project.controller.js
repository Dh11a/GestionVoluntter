const Project  = require('../models/project.model');
const getProjects = async (req, res) => {
  try {
    const { type, location } = req.query;
    const filter = { status: 'open' };
    
    if (type) filter.type = type;
    if (location) filter.location = location;

    const projects = await Project.find(filter);
    res.json(projects);  
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Function to get a specific project by its ID
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);  
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Function to create a new project
const createProject = async (req, res) => {
    try {
      const { title, description, type, location, startDate, endDate, requiredSkills, status } = req.body;
  
      if (!title || !description || !type || !location) {
        return res.status(400).json({ message: 'Please provide all required fields: title, description, type, location.' });
      }
  
      const newProject = new Project({
        title,
        description,
        type,
        location,
        startDate: startDate || null,  
        endDate: endDate || null,      
        requiredSkills: requiredSkills || [],
        status: status || 'open',      
      });
  
    
      await newProject.save();
  
    
    } catch (error) {
      res.status(500).json({ message: 'Error creating project', error: error.message });
    }
  };

module.exports = {
  getProjects,
  getProject,
  createProject,
};
