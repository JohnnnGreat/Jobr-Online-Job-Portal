const { OAuth2Client } = require("google-auth-library");
const User = require("../models/authModels");
const jwt = require("jsonwebtoken");
const Resume = require("../models/resumeModel");

// Initialize OAuth2 client with Google credentials
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

/**
 * Handle user sign-up.
 * Currently, this function logs a message to the console.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.signUp = (req, res) => {
  console.log("signUp");
};

/**
 * Handle Google Sign-In.
 * Verifies the user's Google token, creates or updates the user in the database,
 * and returns a session token.
 *
 * @param {Object} req - The request object containing userPayload in the body.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
exports.googleSignIn = async (req, res) => {
  const { userPayload } = req.body;

  try {
    const { sub: googleId, email, name, picture } = userPayload;

    // Split the user's name into first and last names
    const [firstName, lastName] = name.split(" ");

    // Check if the user exists in the MongoDB database
    let user = await User.findOne({ googleId });
    if (!user) {
      // Create a new user record if not found
      user = new User({
        googleId,
        email,
        firstName,
        lastName,
        profileImage: picture,
      });

      // Create a new resume record
      const resume = new Resume({ user: user.id });
      console.log(resume);
      // Save both user and resume to the database
      await user.save();
      await resume.save();

      // Update user with the resume ID
      const updatedUser = await User.findById(user.id);
      updatedUser.resumeId = resume._id;
      await updatedUser.save();

      user = updatedUser;
    }

    // Generate a session token for the user
    const sessionToken = jwt.sign({ userId: user._id, email: user.email }, "shdhdh", {
      expiresIn: "10h",
    });

    // Send response with success status, token, and user info
    res.json({ success: true, sessionToken, user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid token", error });
  }
};

/**
 * Handle user sign-in with email and password.
 * Verifies the user's credentials and returns a session token.
 *
 * @param {Object} req - The request object containing email and password.
 * @param {Object} res - The response object.
 */
exports.emailSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate a session token for the user
    const sessionToken = jwt.sign({ userId: user._id, email: user.email }, "shdhdh", {
      expiresIn: "10h",
    });

    // Send response with success status, token, and user info
    res.json({ success: true, sessionToken, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * Handle user sign-up with email and password.
 * Hashes the password and saves the user in the database.
 * @param {Object} req - The request object containing email, password, firstName, and lastName.
 * @param {Object} res - The response object.
 */
exports.emailSignUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Create a new resume record
    const resume = new Resume({ user: user.id });

    // Save both user and resume to the database
    await user.save();
    await resume.save();

    // Update user with the resume ID
    user.resumeId = resume._id;
    await user.save();

    // Generate a session token for the user
    const sessionToken = jwt.sign({ userId: user._id, email: user.email }, "shdhdh", {
      expiresIn: "10h",
    });

    // Send response with success status, token, and user info
    res.status(201).json({ success: true, sessionToken, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
