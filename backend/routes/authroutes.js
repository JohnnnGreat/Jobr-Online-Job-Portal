const express = require("express");
const { signUp, googleSignIn } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signUp);
router.post("/google", googleSignIn);

module.exports = router;
