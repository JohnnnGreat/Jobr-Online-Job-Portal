const Job = require("../models/jobsModels");
const sdk = require("node-appwrite");
const User = require("../models/authModels");

const client = new sdk.Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_PROJECT_KEY);
const storage = new sdk.Storage(client);

/**
 * Retrieve all jobs from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    console.log(jobs);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieve all jobs created by a specific user.
 * @param {Object} req - The request object with `userId` parameter.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getAllJobsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const jobs = await Job.find({ user: userId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieve a single job by its ID.
 * @param {Object} req - The request object with `jobId` parameter.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getSingleJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Upload a file to Appwrite and update the user's cover letter with the file URL.
 * @param {Object} req - The request object containing file information and `userId` parameter.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const uploadFile = async (req, res) => {
  const file = req.file;
  const { userId } = req.params;
  const fileId = `image_${Date.now()}`;
  console.log(file);
  try {
    // Upload Image to Appwrite
    await storage.createFile(
      process.env.BUCKET_ID,
      fileId,
      sdk.InputFile.fromPath(file?.path, file.originalname)
    );

    // Get Image URL
    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/66baff6f00172bec04e1/files/${fileId}/view?project=66bafea2003629c14ad9&mode=admin`;

    // Update User with the new file URL
    await User.findByIdAndUpdate(userId, { coverLetter: fileUrl });
    const newUserInfo = await User.findById(userId);

    res.status(202).json({ message: "Image Updated Successfully", user: newUserInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Search for jobs by a given text in title or description.
 * @param {Object} req - The request object containing search text in query.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const searchJobs = async (req, res) => {
  const { searchText } = req.params;
  console.log(searchText);
  try {
    // Search for jobs matching the search text in title or description
    const jobs = await Job.find({
      $or: [
        { jobName: { $regex: searchText, $options: "i" } }, // Case insensitive search in the title
        { jobDescription: { $regex: searchText, $options: "i" } }, // Case insensitive search in the description
      ],
    }).populate("user");

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieve the most recent uploaded jobs.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getRecentJobs = async (req, res) => {
  const { limit = 10 } = req.query; // Optional: set a limit on the number of jobs returned
  try {
    // Fetch jobs sorted by creation date in descending order and limit the number of results
    const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(Number(limit));

    res.status(200).json(recentJobs); // Return the sorted and limited list of jobs
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

module.exports = {
  getAllJobs,
  getAllJobsByUser,
  getSingleJob,
  uploadFile,
  searchJobs,
  getRecentJobs,
};
