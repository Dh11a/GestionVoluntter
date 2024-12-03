const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const volunteerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  firstName: { type: String },
  lastName: { type: String },
  skills: [String],
  interests: [String],
  createdAt: { type: Date, default: Date.now },
});

// Password comparison method
volunteerSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); 
};

// Password hashing middleware
volunteerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


module.exports = mongoose.model('Volunteer', volunteerSchema);
