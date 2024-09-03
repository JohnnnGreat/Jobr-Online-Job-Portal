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
  sendPasswordResetEmail,
  resetPassword,
  getEmployerById,
} = require("../controllers/employerAuthController");
const { employerProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signUp);
router.get("/verify/:token", verifyToken);
router.post("/jobs/add", employerProtect, addJob);
router.get("/jobs/getalljobs", employerProtect, getAllJobs);
router.post("/login", login);
router.get("/getalljobsbyemployer/:userId", employerProtect, getAllJobsByEmployer);
router.delete("/deletejobbyid/:id", employerProtect, deleteJobById);
router.post("/resend-verification-token", employerProtect, sendNewVerificationToken);
router.post("/forgot-password", sendPasswordResetEmail);
router.post("/reset-password/:token", resetPassword);
router.get("/getemployer/:id", getEmployerById);

module.exports = router;
