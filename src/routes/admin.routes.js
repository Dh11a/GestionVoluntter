const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const adminMiddleware = require('../middleware/adminMiddleware');
const Volunteer = require('../models/volunteer.model'); 
const Admin = require('../models/admin.model');
const Project = require('../models/project.model');
const Application = require ('../models/application.model');
const {createProject } = require('../controllers/project.controller');
const {
  renderDashboard, 
  renderProjects, 
  renderVolunteers, 
  renderApplications,
} = require('../controllers/admin.controller');  

router.get('/dashboard', adminMiddleware, (req, res) => {
  console.log('Admin session:', req.session.user);  
  renderDashboard(req, res);
});

router.get('/projects', adminMiddleware, renderProjects);

router.get('/volunteers', adminMiddleware, renderVolunteers);

router.get('/applications', adminMiddleware, renderApplications);

router.get('/admin/login', (req, res) => {
  res.render('admin/login'); 
});

router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).send('Admin not found');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    req.session.user = { role: 'admin', username: admin.username };
    res.redirect('/admin/dashboard');  
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

router.post('/admin/create', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).send('Username already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      password: hashedPassword
    });

    await newAdmin.save();
    res.status(201).send('Admin created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating admin');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/admin/dashboard');  
    }
    res.redirect('/admin/login');  
  });
});
router.post('/projects/create', createProject);

router.post('/volunteers/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Volunteer.findByIdAndDelete(id);
    res.redirect('/admin/volunteers');  
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting volunteer');
  }
});

router.post('/projects/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.redirect('/admin/projects');  
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting project');
  }
});
router.post('/applications/delete/:id', async (req, res) => {
  try {
    const applicationId = req.params.id;

    await Application.findByIdAndDelete(applicationId);

    res.redirect('/admin/applications');
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).send('An error occurred while deleting the application.');
  }
});
module.exports = router;
