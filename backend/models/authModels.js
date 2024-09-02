const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  googleId: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  password: {
    type: String,
    minlength: 8,
  },

  role: {
    type: String,
    enum: ["employer", "jobseeker", "admin"],
    default: "jobseeker",
  },
  profileImage: {
    type: String,
    default: "",
  },

  coverLetter: {
    type: String,
  },
  resumeId: {
    type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to automatically update the `updatedAt` field on save
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model
module.exports = mongoose.model("User", userSchema);
