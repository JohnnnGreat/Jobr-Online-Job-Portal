// Import mongoose
const mongoose = require("mongoose");

// Define the schema
const userApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    coverLetter: {
      type: String,
      trim: true,
    },
    resumeUrl: {
      type: String,
      trim: true,
      required: true,
    },
    applicationStatus: {
      type: String,
      enum: ["applied", "reviewing", "shortlisted", "rejected", "accepted"],
      default: "applied",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
    feedback: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the model
const UserApplication = mongoose.model("UserApplication", userApplicationSchema);

// Export the model
module.exports = UserApplication;
