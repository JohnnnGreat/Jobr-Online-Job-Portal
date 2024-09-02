const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Employer = require("../models/employerAuthModels");
const bcrypt = require("bcryptjs");
const Job = require("../models/jobsModels");
const jwt = require("jsonwebtoken");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // or use a different email service
  auth: {
    user: "scholarhubbot@gmail.com",
    pass: "vqrrtrkcnmdicsht",
  },
});

/**
 * Verifies the user's account using the verification token.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves when the token is verified.
 */
const verifyToken = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await Employer.findOne({ verificationToken: token });
    console.log(user);

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ msg: "Account verified successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * Authenticates a user and generates a session token.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves when the user is authenticated.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    let user = await Employer.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Login Credentials" });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Login Credentials" });
    }

    const sessionToken = jwt.sign(
      { employerId: user._id, email: user.email, isVerified: user.isVerified, isAdmin: true },
      process.env.JWT_TOKEN,
      {
        expiresIn: "10h",
      }
    );

    return res.status(200).json({ sessionToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * Registers a new user and sends a verification email.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves when the user is registered.
 */
const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    let user = await Employer.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new Employer({
      name,
      email,
      password,
      verificationToken: crypto.randomBytes(32).toString("hex"),
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Send verification email
    const verifyUrl = `http://localhost:5173/employer/verify/${user.verificationToken}`;
    const mailOptions = {
      from: "scholarhubbot@gmail.com",
      to: email,
      subject: "Account Verification",
      html: `Please click the following link to verify your account: <a href="${verifyUrl}">Verify your account</a>`,
    };

    const sessionToken = jwt.sign({ employerId: user._id, email: user.email }, "shdhdh", {
      expiresIn: "10h",
    });

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ msg: "Error sending verification email" });
      }
      res.status(201).json({
        msg: "User registered successfully. Please check your email to verify your account.",
        sessionToken,
        employer: user,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * Adds a new job to the database.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves when the job is added.
 */
const addJob = async (req, res) => {
  try {
    const jobData = req.body;
    console.log(jobData);

    // Generate a new unique ID
    const lastJob = await Job.findOne().sort({ id: -1 });
    const newId = lastJob ? lastJob.id + 1 : 1;
    jobData.id = newId;

    // Create a new job instance
    const newJob = new Job(jobData);

    // Save the new job to the database
    const savedJob = await newJob.save();

    res.status(201).json(savedJob);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors });
    }
    // Handle other errors
    console.error("Error creating job:", error);
    res.status(500).json({ error: "An error occurred while creating the job" });
  }
};

/**
 * Retrieves all jobs from the database.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves when the jobs are fetched.
 */
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "An error occurred while fetching jobs" });
  }
};

/**
 * Retrieves all jobs posted by a specific employer.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves when the jobs are fetched.
 */
const getAllJobsByEmployer = async (req, res) => {
  console.log(req.params);
  try {
    const jobs = await Job.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "An error occurred while fetching jobs" });
  }
};

/**
 * Deletes a job by its ID.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves when the job is deleted.
 */
const deleteJobById = async (req, res) => {
  try {
    const jobId = req.params.id; // Get the job ID from request parameters

    // Find and delete the job by ID
    const result = await Job.findByIdAndDelete(jobId);

    if (!result) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job successfully deleted" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendNewVerificationToken = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Please provide an email address" });
  }

  try {
    const user = await Employer.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Generate a new verification token
    user.verificationToken = crypto.randomBytes(32).toString("hex");
    await user.save();

    // Send verification email
    const verifyUrl = `http://localhost:5173/employer/verify/${user.verificationToken}`;
    const mailOptions = {
      from: "scholarhubbot@gmail.com",
      to: email,
      subject: "Account Verification",
      html: `Please click the following link to verify your account: <a href="${verifyUrl}">Verify your account</a>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ msg: "Error sending verification email" });
      }
      res.status(200).json({
        msg: "Verification email sent successfully. Please check your email.",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * Handles password reset request by sending an email with a reset link.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 */
const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Please provide an email address" });
  }

  try {
    const user = await Employer.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Generate a reset token and expiration time
    user.resetToken = crypto.randomBytes(32).toString("hex");
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send reset email
    const resetUrl = `http://localhost:5173/employer/reset-password/${user.resetToken}`;
    const mailOptions = {
      from: "scholarhubbot@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `Please click the following link to reset your password: <a href="${resetUrl}">Reset your password</a>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ msg: "Error sending reset email" });
      }
      res.status(200).json({
        msg: "Password reset email sent successfully. Please check your email.",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * Resets the user's password.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 */
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ msg: "Please provide a new password" });
  }

  try {
    const user = await Employer.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }, // Check if token is not expired
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ msg: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  deleteJobById,
  signUp,
  verifyToken,
  addJob,
  getAllJobs,
  login,
  getAllJobsByEmployer,
  sendNewVerificationToken,
  sendPasswordResetEmail,
  resetPassword,
};
