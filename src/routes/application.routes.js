const express = require('express');
const router = express.Router();
const { applyToProject, getMyApplications, getApplicationStatus } = require('../controllers/application.controller.js');
const { verifyToken } = require('../middleware/verifyToken');


router.post('/:id/application', verifyToken,applyToProject);



router.get('/applications',getMyApplications);

router.get('/applications/:idCandidature',getApplicationStatus);

module.exports = router;
