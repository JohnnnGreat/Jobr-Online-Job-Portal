const express = require("express");
const { updateResume, getResume } = require("../controllers/resume");

const router = express.Router();

router.put("/update-resume/:id", updateResume);
router.get("/:userId", getResume);

module.exports = router;
