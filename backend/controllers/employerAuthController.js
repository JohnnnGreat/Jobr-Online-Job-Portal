const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Employer = require("../models/employerAuthModels");
const bcrypt = require("bcryptjs");
const Job = require("../models/jobsModels");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const verifyToken = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await Employer.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ msg: "Account verified successfully", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const user = await Employer.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Login Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Login Credentials" });
    }

    const sessionToken = jwt.sign(
      { employerId: user._id, email: user.email, isVerified: user.isVerified, isAdmin: true },
      process.env.JWT_TOKEN,
      { expiresIn: "10h" }
    );

    return res.status(200).json({ sessionToken, user });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

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

    const verifyUrl = `${
      process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://jobr.vercel.app"
    }/employer/verify/${user.verificationToken}`;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Account Verification",
      html: `Please click the following link to verify your account: <a href="${verifyUrl}">Verify your account</a>`,
    };

    const sessionToken = jwt.sign({ employerId: user._id, email: user.email }, "shdhdh", {
      expiresIn: "10h",
    });

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ msg: "Error sending verification email" });
      }
      res.status(201).json({
        msg: "User registered successfully. Please check your email to verify your account.",
        sessionToken,
        employer: user,
      });
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const addJob = async (req, res) => {
  try {
    const jobData = req.body;

    const lastJob = await Job.findOne().sort({ id: -1 });
    const newId = lastJob ? lastJob.id + 1 : 1;
    jobData.id = newId;

    const newJob = new Job(jobData);
    const savedJob = await newJob.save();

    res.status(201).json(savedJob);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: "An error occurred while creating the job" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching jobs" });
  }
};

const getAllJobsByEmployer = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching jobs" });
  }
};

const deleteJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const result = await Job.findByIdAndDelete(jobId);

    if (!result) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job successfully deleted" });
  } catch (error) {
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

    user.verificationToken = crypto.randomBytes(32).toString("hex");
    await user.save();

    const verifyUrl = `${
      process.env.NODE_ENV === "development" ? "http://localhost:5174" : "https://jobr.vercel.app"
    }/employer/verify/${user.verificationToken}`;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Account Verification",
      html: `Please click the following link to verify your account: <a href="${verifyUrl}">Verify your account</a>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ msg: "Error sending verification email" });
      }
      res.status(200).json({
        msg: "Verification email sent successfully. Please check your email.",
      });
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

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

    user.resetToken = crypto.randomBytes(32).toString("hex");
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${
      process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://jobr.vercel.app"
    }/employer/reset-password/${user.resetToken}`;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `Please click the following link to reset your password: <a href="${resetUrl}">Reset your password</a>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ msg: "Error sending reset email" });
      }
      res.status(200).json({
        msg: "Password reset email sent successfully. Please check your email.",
      });
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ msg: "Please provide a new password" });
  }

  try {
    const user = await Employer.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ msg: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getEmployerById = async (req, res) => {
  const { id } = req.params;

  try {
    const employer = await Employer.findById(id);

    if (!employer) {
      return res.status(404).json({ msg: "Employer not found" });
    }

    res.status(200).json(employer);
  } catch (error) {
    console.error(error);
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
  getEmployerById,
};
