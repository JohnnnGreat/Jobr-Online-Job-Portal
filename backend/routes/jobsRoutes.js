// jobRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAllJobs,
  getAllJobsByUser,
  getSingleJob,
  uploadFile,
} = require("../controllers/jobsController"); // Adjust the path according to your project structure

const upload = multer({ dest: "uploads/" });
// Route to get all jobs
router.get("/", getAllJobs);

// Route to get all jobs by a specific user
router.get("/jobs/user/:userId", getAllJobsByUser);

// Route to get a single job by its ID
router.get("/jobs/:jobId", getSingleJob);

router.post("/uploadfile/:userId", upload.single("file"), uploadFile);

module.exports = router;
