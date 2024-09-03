const Job = require("../models/jobsModels");
const sdk = require("node-appwrite");
const User = require("../models/authModels");

const client = new sdk.Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_PROJECT_KEY);

const storage = new sdk.Storage(client);

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllJobsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const jobs = await Job.find({ user: userId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

const uploadFile = async (req, res) => {
  const file = req.file;
  const { userId } = req.params;
  const fileId = `image_${Date.now()}`;

  try {
    await storage.createFile(
      process.env.BUCKET_ID,
      fileId,
      sdk.InputFile.fromPath(file?.path, file.originalname)
    );

    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/66baff6f00172bec04e1/files/${fileId}/view?project=66bafea2003629c14ad9&mode=admin`;

    await User.findByIdAndUpdate(userId, { coverLetter: fileUrl });
    const newUserInfo = await User.findById(userId);

    res.status(202).json({ message: "Image Updated Successfully", user: newUserInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchJobs = async (req, res) => {
  const { searchText } = req.params;

  try {
    const jobs = await Job.find({
      $or: [
        { jobName: { $regex: searchText, $options: "i" } },
        { jobDescription: { $regex: searchText, $options: "i" } },
      ],
    }).populate("user");

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecentJobs = async (req, res) => {
  const { limit = 10 } = req.query;
  try {
    const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(Number(limit));
    res.status(200).json(recentJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
