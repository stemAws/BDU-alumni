const jobService = require("../services/job-services");
const path = require("path");
const sharp = require("sharp");

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebaseConfig");
const firebsae = require("firebase/app");
firebsae.initializeApp(firebaseConfig);
const storage = getStorage();
exports.createJob = async (req, res) => {
  try {
    const imagePath = req.file
      ? `job/${Date.now()}${path.extname(req.file.originalname)}`
      : null;
    let downloadURL = null;

    // file part should be removed just for now let it stay... will be removed after decision

    if (req.file) {
      const fileRef = ref(storage, imagePath);
      resizedFile = await sharp(req.file.buffer)
        .jpeg({ quality: 50 })
        .toBuffer();

      await uploadBytes(fileRef, resizedFile);
      downloadURL = await getDownloadURL(fileRef);
    }

    const job = await jobService.addJob(downloadURL, req.body, req.alumni.personId);
    res.status(201).json({ message: "Job added successfully", job });
  } catch (error) {
    console.error("Error adding job:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

exports.getAdminJobs = async (req, res) => {
  try {
    const jobs = await jobService.getJobs();
    res.send(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await jobService.getJob(req.params.jobId);
    if (!job) res.status(404).json("No record by the given id");
    else res.send(job);
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updatedJobData = req.body;

    const affectedRows = await jobService.updateJob(jobId, updatedJobData);

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ error: `No record with the given id: ${id}` });
    }

    return res.json({ message: "Job updated successfully" });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteJobById = async (req, res) => {
  try {
    const affectedRows = await jobService.deleteJob(req.params.jobId);
    if (affectedRows === 0) res.status(404).json("No record by the given id");
    else res.send("Job deleted.");
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllJobData = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.send(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchJobs = async (req, res) => {
  try {
    const { jobTitle, industry } = req.body;
    const jobs = await jobService.searchJobsBy(jobTitle, industry);
    res.send(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
