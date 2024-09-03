const UserApplication = require("../models/userApplicationModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const sendEmailNotification = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};

const addApplication = async (req, res) => {
  try {
    const { userId, jobId, coverLetter, resumeUrl, employerId } = req.body;

    if (!userId || !jobId || !resumeUrl) {
      return res.status(400).json({ message: "User ID, Job ID, and Resume URL are required." });
    }

    const existingApplication = await UserApplication.findOne({ userId, jobId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied to this job." });
    }

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
    res.status(500).json({ message: "Error adding application", error: error.message });
  }
};

const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;
    const applications = await UserApplication.find({ userId }).populate("jobId", "jobName");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user applications", error: error.message });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await UserApplication.find({ jobId });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job applications", error: error.message });
  }
};

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

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { applicationStatus, feedback } = req.body;

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

    const userEmail = updatedApplication.userId.email;
    const jobName = updatedApplication.jobId.jobName;
    const jobDescription = updatedApplication.jobId.jobDescription;
    const userName = updatedApplication.userId.firstName;

    const subject = "Application Status Updated";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <p>Dear ${userName},</p>
        <p>Your application for the job "<strong>${jobName}</strong>" has been updated to the status: <strong>${applicationStatus}</strong>.</p>
        <div>Feedback</div>
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
    res.status(500).json({ message: "Error updating application status", error: error.message });
  }
};

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

const getAllJobsByEmployer = async (req, res) => {
  try {
    const { employerId } = req.params;
    const applications = await UserApplication.find({ employerId }).populate("jobId userId");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

module.exports = {
  addApplication,
  getUserApplications,
  getJobApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getAllJobsByEmployer,
};
