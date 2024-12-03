const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  message: {
    type: String,
    trim: true, 
  },
  appliedAt: {
    type: Date,
    default: Date.now, 
  },
});

module.exports = mongoose.model('Application', applicationSchema);
