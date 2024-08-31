const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/userApplicationControllers");

// Route to add a new application
router.post("/", applicationController.addApplication);

// Route to get all applications for a specific user
router.get("/user/:userId", applicationController.getUserApplications);

// Route to get all applications for a specific job
router.get("/job/:jobId", applicationController.getJobApplications);

// Route to get a single application by ID
router.get("/:applicationId", applicationController.getApplicationById);

// Route to update application status
router.put("/:applicationId", applicationController.updateApplicationStatus);

// Route to delete an application
router.delete("/:applicationId", applicationController.deleteApplication);

module.exports = router;
