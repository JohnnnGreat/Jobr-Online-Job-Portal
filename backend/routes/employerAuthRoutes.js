const express = require("express");
const {
  signUp,
  verifyToken,
  addJob,
  getAllJobs,
  login,
  getAllJobsByEmployer,
  deleteJobById,
  sendNewVerificationToken,
} = require("../controllers/employerAuthController");

const router = express.Router();

router.post("/signup", signUp);
router.get("/verify/:token", verifyToken);
router.post("/jobs/add", addJob);
router.get("/jobs/getalljobs", getAllJobs);
router.post("/login", login);
router.get("/getalljobsbyemployer/:userId", getAllJobsByEmployer);
router.delete("/deletejobbyid/:id", deleteJobById);
router.post("/resend-verification-token", sendNewVerificationToken);

module.exports = router;
