const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv").config();

// Import route handlers
const authRoutes = require("./routes/authroutes");
const resumeRoutes = require("./routes/resumeRoutes");
const employerRoutes = require("./routes/employerAuthRoutes");
const jobRoutes = require("./routes/jobsRoutes");
const applicationRoutes = require("./routes/userApplicationRoutes");

// Initialize Express app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "*", // Configure allowed origins for CORS
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(passport.initialize());

// Route setup
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/employer", employerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Root route
app.post("/", (req, res) => {
  res.send("Welcome to the E-Commerce API");
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    const PORT = process.env.PORT || 7070;
    const DATABASE_URL =
      process.env.NODE_ENV === "development" ? process.env.MONGO_DATABASE_URL : process.env.DB_URL;

    await mongoose.connect(DATABASE_URL);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

// Start the server
startServer();
