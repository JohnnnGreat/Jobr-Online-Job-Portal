const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv").config();
const socketIo = require("socket.io");
const http = require("http");
const { WebSocketServer } = require("ws");
// Import route handlers
const authRoutes = require("./routes/authroutes");
const resumeRoutes = require("./routes/resumeRoutes");
const employerRoutes = require("./routes/employerAuthRoutes");
const jobRoutes = require("./routes/jobsRoutes");
const applicationRoutes = require("./routes/userApplicationRoutes");

// Initialize Express app
const app = express();

// Create HTTP server and attach Socket.IO
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
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

wsServer.on("connection", function (connection) {
  console.log("A new WebSocket connection has been established.");

  connection.on("message", (message) => {
    console.log("Received message:", message);
  });

  connection.on("close", () => {
    console.log("WebSocket connection closed.");
  });
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    const PORT = process.env.PORT || 7070;

    const DATABASE_URL =
      process.env.NODE_ENV === "development" ? process.env.MONGO_DATABASE_URL : process.env.DB_URL;

    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");

    // Set up change stream listeners
    const db = mongoose.connection.db;

    // Listen for changes in the "yourCollectionName" collection
    const changeStream = db.collection("employers").watch();
    changeStream.on("change", (change) => {
      console.log("Change detected:", change);

      // Broadcast changes to all WebSocket clients
      wsServer.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(change));
        }
      });
    });
    server.listen(8080, () => {
      console.log(`WebSocket server is running on port 8080`);
    });

    app.listen(PORT, () => {
      console.log(`Server running`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

// Start the server
startServer();
