// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema
const EmployerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
});

// Create User Model
const Employer = mongoose.model("Employer", EmployerSchema);

module.exports = Employer;
