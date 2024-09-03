const { OAuth2Client } = require("google-auth-library");
const User = require("../models/authModels");
const jwt = require("jsonwebtoken");
const Resume = require("../models/resumeModel");
const bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {};

exports.googleSignIn = async (req, res) => {
  const { userPayload } = req.body;

  try {
    const { sub: googleId, email, name, picture } = userPayload;
    const [firstName, lastName] = name.split(" ");

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ googleId, email, firstName, lastName, profileImage: picture });
      const resume = new Resume({ user: user.id });

      await user.save();
      await resume.save();

      user.resumeId = resume._id;
      await user.save();
    }

    const sessionToken = jwt.sign({ userId: user._id, email: user.email }, "shdhdh", {
      expiresIn: "10h",
    });

    res.json({ success: true, sessionToken, user });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token", error });
  }
};

exports.emailSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const sessionToken = jwt.sign({ userId: user._id, email: user.email }, "shdhdh", {
      expiresIn: "10h",
    });

    res.json({ success: true, sessionToken, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

exports.emailSignUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const resume = new Resume({ user: user.id });

    await user.save();
    await resume.save();

    user.resumeId = resume._id;
    await user.save();

    const sessionToken = jwt.sign({ userId: user._id, email: user.email }, "shdhdh", {
      expiresIn: "10h",
    });

    res.status(201).json({ success: true, sessionToken, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
