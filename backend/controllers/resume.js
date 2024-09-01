const Resume = require("../models/resumeModel");

/**
 * Controller to add a new resume.
 * @param {Object} req - The request object containing resume data.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const addResume = async (req, res) => {
  console.log(req.body);
  try {
    // Create a new resume document
    const newResume = new Resume({
      ...req.body,
    });
    // Save the new resume to the database
    await newResume.save();

    res.status(201).json({ message: "Resume added successfully", resume: newResume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add resume", error: error.message });
  }
};

/**
 * Controller to update an existing resume.
 * @param {Object} req - The request object containing resume data and `id` parameter.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const updateResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    console.log(req.body);

    // Find the resume by ID and update it with new data
    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      { ...req.body },
      { new: true, runValidators: true }
    );

    console.log(newResume);
    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume updated successfully", resume: updatedResume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update resume", error: error.message });
  }
};

/**
 * Controller to get a resume by user ID.
 * @param {Object} req - The request object containing `userId` parameter.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getResume = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const resume = await Resume.findOne({ user: userId }).populate(
      "user",
      "name email profileImage firstName lastName"
    );
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

module.exports = { addResume, updateResume, getResume };
