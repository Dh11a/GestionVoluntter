const express = require('express');
const router = express.Router();
const { getProjects, getProject, createProject } = require('../controllers/project.controller.js');


router.get('/', getProjects);


router.get('/:id', getProject);


router.post('/', createProject);  

module.exports = router;
