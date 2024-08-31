const mongoose = require("mongoose");

// Define the schema for job data
const jobSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobName: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Remote", "On-site", "Hybrid"], // Example of job types, adjust as necessary
      required: true,
    },
    salary: {
      type: Number,
      default: 0, // Assuming salary is optional and defaults to 0
    },
    companyVerified: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      required: true,
    },
    jobResponsibilities: {
      type: [String], // Array of strings
      required: true,
    },
    weOffer: {
      type: [String], // Array of strings
      required: true,
    },
    jobRequirements: {
      type: [String], // Array of strings
      default: [],
    },
    qualifications: {
      type: [String], // Array of strings
      default: [],
    },
    technicalSkills: {
      type: [String], // Array of strings
      default: [],
    },
    softSkills: {
      type: [String], // Array of strings
      default: [],
    },
    preferredSkills: {
      type: [String], // Array of strings
      default: [],
    },
    urgentHiring: {
      type: Boolean,
      default: false,
    },
    aboutCompany: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    otherInfo: {
      type: [String], // Array of strings
      default: [],
    },
    applicationEmail: {
      type: String,
      required: true,
      match: /.+\@.+\..+/, // Basic regex for email validation
    },
    companyLogo: {
      type: String,
      required: true,
      match: /^https?:\/\//i, // Basic regex to ensure it starts with http or https
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Job model using the jobSchema
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
