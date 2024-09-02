const { application } = require("express");
const UserApplication = require("../models/userApplicationModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // or use a different email service
  auth: {
    user: "scholarhubbot@gmail.com",
    pass: "vqrrtrkcnmdicsht",
  },
});

/**
 * Function to send email notification
 * @param {string} to - Recipient's email address
 * @param {string} subject - Subject of the email
 * @param {string} text - Text content of the email
 * @returns {Promise<void>}
 */
const sendEmailNotification = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: "scholarhubbot@gmail.com",
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

/**
 * Controller to add a new application.
 * @param {Object} req - The request object containing application data.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const addApplication = async (req, res) => {
  try {
    const { userId, jobId, coverLetter, resumeUrl, employerId } = req.body;

    // Validate required fields
    if (!userId || !jobId || !resumeUrl) {
      return res.status(400).json({ message: "User ID, Job ID, and Resume URL are required." });
    }

    // Check if the user has already applied to this job
    const existingApplication = await UserApplication.findOne({ userId, jobId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied to this job." });
    }

    // Create a new application
    const newApplication = new UserApplication({
      userId,
      jobId,
      coverLetter,
      resumeUrl,
      employerId,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json({ message: "Application successful", savedApplication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding application", error: error.message });
  }
};

/**
 * Controller to get all applications for a specific user.
 * @param {Object} req - The request object containing the `userId` parameter.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;
    const applications = await UserApplication.find({ userId }).populate("jobId", "jobName");
    res.status(200).json(applications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching user applications", error: error.message });
  }
};

/**
 * Controller to get all applications for a specific job.
 * @param {Object} req - The request object containing the `jobId` parameter.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await UserApplication.find({ jobId });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job applications", error: error.message });
  }
};

/**
 * Controller to get a single application by its ID.
 * @param {Object} req - The request object containing the `applicationId` parameter.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const application = await UserApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error fetching application", error: error.message });
  }
};

/**
 * Controller to update an application's status.
 * @param {Object} req - The request object containing the `applicationId` parameter and new status in `req.body`.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { applicationStatus, feedback } = req.body;

    console.log(applicationStatus, feedback);

    // Validate the new status
    const validStatuses = ["applied", "reviewing", "shortlisted", "rejected", "accepted"];
    if (!validStatuses.includes(applicationStatus)) {
      return res.status(400).json({ message: "Invalid application status" });
    }

    const updatedApplication = await UserApplication.findByIdAndUpdate(
      applicationId,
      { applicationStatus, feedback },
      { new: true, runValidators: true }
    ).populate("userId jobId");

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Send email notification to the user
    const userEmail = updatedApplication.userId.email; // Assuming `userId` references a User model that has an `email` field
    const jobName = updatedApplication.jobId.jobName; // Extract job name from populated jobId
    const jobDescription = updatedApplication.jobId.jobDescription; // Example additional field
    const userName = updatedApplication.userId.firstName; // Extract user name from populated

    const subject = "Application Status Updated";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <p>Dear ${userName},</p>
        <p>Your application for the job "<strong>${jobName}</strong>" has been updated to the status: <strong>${applicationStatus}</strong>.</p>
        <div>Feed back</div>
        <p>${feedback}</p>
        <h3>Job Details:</h3>
        <ul>
          <li><strong>Job Title:</strong> ${jobName}</li>
          <li><strong>Job Description:</strong> ${jobDescription}</li>
        </ul>
        <p>Please log in to your account for more details.</p>
        <p>Thank you,</p>
        <p>Team</p>
      </div>
    `;

    await sendEmailNotification(userEmail, subject, htmlContent);

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating application status", error: error.message });
  }
};

/**
 * Controller to delete an application by ID.
 * @param {Object} req - The request object containing the `applicationId` parameter.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const deletedApplication = await UserApplication.findByIdAndDelete(applicationId);
    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting application", error: error.message });
  }
};

/**
 * Controller to get all applications by Employer Ids
 * @param {Object} req  -  The Request containing the employerId parameter
 * @param {*} res The response object
 */

const getAllJobsByEmployer = async (req, res) => {
  const { employerId } = req.params;

  try {
    const applications = await UserApplication.find({ employerId }).populate("jobId userId");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Application", error: error.message });
  }
};
// Export the controllers
module.exports = {
  addApplication,
  getUserApplications,
  getJobApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getAllJobsByEmployer,
};
