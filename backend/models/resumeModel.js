const mongoose = require("mongoose");

// Define the schema for job experience
const jobExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Marketing Manager"
  company: { type: String, required: true }, // e.g., "TechInnovate Solutions"
  location: { type: String, required: true }, // e.g., "San Francisco, CA"
  startDate: { type: Date, required: true }, // e.g., June 2019
  endDate: { type: Date }, // e.g., June 2021
  responsibilities: { type: String }, // Job responsibilities
});

const socials = new mongoose.Schema({
  linkedin: { type: String },
  facebook: { type: String },
  twitter: { type: String },
});

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phoneNo: { type: String },
  homeAddress: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  yearsOfExp: { type: String },
  portfolio: { type: String },
  profileSummary: { type: String, default: "" }, // Profile summary
  skills: { type: [String], default: [] }, // Array of skills
  languages: { type: [String], default: [] }, // Array of languages
  jobExperience: { type: [jobExperienceSchema], default: [] }, // Array of job experiences
  resumeFilePath: { type: String, default: "" }, // File path for uploaded resume
  socials: { type: socials, default: {} }, // Social media links
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
