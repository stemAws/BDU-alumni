const db = require("../config/db");

exports.addJob = async (
  jobTitle,
  description,
  industry,
  companyAddress,
  employmentType,
  deadline,
  email,
  phoneNumber,
  linkedIn,
  image_path,
) => {
  try {
    let query, params;

    if (image_path) {
      query =
        "INSERT INTO jobposting (jobTitle, description, industry, companyAddress, employmentType, deadline, email, phoneNumber, linkedIn, adminId, image) VALUES (?,?, ?, ?, ?, ?, ?,?,?,?)";
      params = [
        jobTitle,
        description,
        industry,
        companyAddress,
        employmentType,
        deadline,
        email,
        phoneNumber,
        linkedIn,
        image_path
      ];
    } else {
      query =
        "INSERT INTO jobposting (jobTitle, description, industry, companyAddress, employmentType, deadline, email, phoneNumber, linkedIn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      params = [
        jobTitle,
        description,
        industry,
        companyAddress,
        employmentType,
        deadline,
        email,
        phoneNumber,
        linkedIn,
      
      ];
    }

    const [result] = await db.query(query, params);

    return result.insertId;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
};

exports.getJobs = async () => {
  const query = `SELECT jobPostingId, jobTitle, industry FROM jobposting`;
  const [result] = await db.query(query);
  return result;
};

exports.getJob = async (jobId) => {
  const [job] = await db.query(
    `SELECT *, DATE_FORMAT(deadline, '%Y-%m-%d') AS deadline FROM jobposting WHERE jobPostingId = ?`,[jobId]);
  return job.length > 0 ? job[0] : null;
};
