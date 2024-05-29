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
    const {
      jobTitle,
      description,
      industry,
      companyAddress,
      employmentType,
      deadline,
      email,
      phoneNumber,
      linkedIn,
    } = req.body;
    const imagePath = req.file
      ? `job/${Date.now()}${path.extname(req.file.originalname)}`
      : null;
    let downloadURL = null;

    if (req.file) {
      const fileRef = ref(storage, imagePath);
      resizedFile = await sharp(req.file.buffer)
        .jpeg({ quality: 50 })
        .toBuffer();

      await uploadBytes(fileRef, resizedFile);
      downloadURL = await getDownloadURL(fileRef);
    }

    const job = await jobService.addJob(
      jobTitle,
      description,
      industry,
      companyAddress,
      employmentType,
      deadline,
      email,
      phoneNumber,
      linkedIn
    );
    res.status(201).json({ message: "Job added successfully", job });
  } catch (error) {
    console.error("Error adding job:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
