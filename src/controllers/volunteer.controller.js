const Volunteer = require('../models/volunteer.model'); 
const bcrypt = require('bcrypt');
const {generateToken} = require('../middleware/generateToken');

// Function to create a new volunteer
const createVolunteer = async (req, res) => {
    try {
        const { email, password, firstName, lastName, skills, interests } = req.body;


        const existingVolunteer = await Volunteer.findOne({ email });
        if (existingVolunteer) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newVolunteer = new Volunteer({
            email,
            password,
            firstName,
            lastName,
            skills,
            interests
        });

        
        await newVolunteer.save();
        res.status(201).json(newVolunteer);
    } catch (error) {
        res.status(500).json({ message: 'Error creating volunteer', error: error.message });
    }
};

const getVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        res.json(volunteer);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching volunteer', error: error.message });
    }
};

const loginVolunteer = async (req, res) => {
    try {
        const { email, password } = req.body;

        const volunteer = await Volunteer.findOne({ email });
        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        const isMatch = await volunteer.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(volunteer.email);

        res.json({ message: 'Login successful',token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

const getAllVolunteers = async (req, res) => {
    try {
        console.log('Fetching all volunteers...');
        const volunteers = await Volunteer.find(); 
        res.json(volunteers);  
    } catch (error) {
        res.status(500).json({ message: 'Error fetching volunteers', error: error.message });
    }
};


module.exports = {
    createVolunteer,
    getVolunteer,
    loginVolunteer,
    getAllVolunteers, 
};
