const adminService = require("../services/admin-services");

exports.uploadAlumniData = async (req, res) => {
  try {
    const alumniData = adminService.parseExcelFile(req.file.buffer);
    const graduationYear = req.body.graduationYear;

    await adminService.createAlumniRecord(alumniData, graduationYear);

    res.status(200).json({ message: "Alumni data uploaded successfully" });
  } catch (error) {
    console.error("Error uploading alumni data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSuggestedToAdmin = async (req, res) => {
  try {
    const suggestedPosts = await adminService.fetchSuggestedPostsToAdmin();
    res.json(suggestedPosts);
  } catch (error) {
    console.error("Error fetching suggested posts to admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getGradYear = async (req, res) => {
  try {
    const gradYears = await adminService.getYear();
    res.json(gradYears);
  } catch (error) {
    console.error("Error fetching grduating years:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.postID;
  const { suggestedByAdmin } = req.body;
  try {
    const result = await adminService.updatePost(postId, suggestedByAdmin);
    res.json(result);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSuggestedByAdmin = async (req, res) => {
  try {
    const suggestedPosts = await adminService.fetchSuggestedPostsByAdmin();
    res.json(suggestedPosts);
  } catch (error) {
    console.error("Error fetching suggested posts by admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getGeoData = async (req, res) => {
  try {
    const geoData = await adminService.fetchGeoData();
    res.json(geoData);
  } catch (error) {
    console.error("Error fetching geo data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserDataByCountry = async (req, res) => {
  try {
    const country = req.query.country;
    const userData = await adminService.fetchUserDataByCountry(country);
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data by country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addDonation = async (req, res) => {
  try {
    const { title, link, description } = req.body;
    const donation = await adminService.addDonation(title, link, description);
    res.status(200).json(donation);
  } catch (error) {
    console.error("Error adding donation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const donations = await adminService.fetchDonations();
    res.json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAlumni = async (req, res) => {
  try {
    const alumniData = await adminService.getAlumniList();
    res.json(alumniData);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.veifyAlumni = async function (req, res) {
  try {
    const { verified } = req.body;
    const alumniId = req.params.alumniId;

    const affectedRows = await adminService.updateVerified(alumniId, verified);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Alumni not found" });
    }

    res.json({ success: "Verified change successful" });
  } catch (error) {
    console.error("Error changing verified:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDegree = async (req, res) => {
  try {
    const { graduatingYear } = req.query;
    const result = await adminService.getDegreeCount(graduatingYear);
    res.json(result);
  } catch (error) {
    console.error("Error fetching degree:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAdmission = async (req, res) => {
  try {
    const { graduatingYear } = req.query;
    const result = await adminService.getAdmissionCount(graduatingYear);
    res.json(result);
  } catch (error) {
    console.error("Error fetching admission:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getMajors = async (req, res) => {
  try {
    const { graduatingYear } = req.query;
    const result = await adminService.getMajorsCount(graduatingYear);
    res.json(result);
  } catch (error) {
    console.error("Error fetching majors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getJob = async (req, res) => {
  try {
    const result = await adminService.getJobCount();
    res.json(result);
  } catch (error) {
    console.error("Error fetching majors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getIndustry = async (req, res) => {
  try {
    const result = await adminService.getIndustryCount();
    res.json(result);
  } catch (error) {
    console.error("Error fetching industry count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const result = await adminService.getCompanyCount();
    res.json(result);
  } catch (error) {
    console.error("Error fetching company count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.approveJob = async (req, res) => {
  try {
    const result = await adminService.approveJob(req.params.jobPostingId);
    res.json({ success: true });
  } catch (error) {
    console.error("Error approving the job", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
