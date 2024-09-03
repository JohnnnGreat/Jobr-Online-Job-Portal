const Resume = require("../models/resumeModel");

/**
 * Controller to update an existing resume.
 * @param {Object} req - The request object containing resume data and `id` parameter.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const updateResume = async (req, res) => {
  const { id: resumeId } = req.params; // Destructure to directly get the resumeId from req.params
  const updateData = { ...req.body }; // Spread req.body to avoid direct mutation and for clarity

  try {
    const updatedResume = await Resume.findByIdAndUpdate(resumeId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume updated successfully", resume: updatedResume });
  } catch (error) {
    console.error("Error updating resume:", error.message);
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
    console.error("Error fetching resume:", error.message);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

module.exports = { updateResume, getResume };
