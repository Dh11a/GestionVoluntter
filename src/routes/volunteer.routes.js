const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteer.controller');
const { verifyToken } = require('../middleware/verifyToken');


router.get('/',verifyToken ,volunteerController.getAllVolunteers); 


router.get('/:id',verifyToken ,volunteerController.getVolunteer);  


router.post('/', volunteerController.createVolunteer);  


router.post('/login', volunteerController.loginVolunteer); 

module.exports = router;
