const db = require("../config/db");

exports.addJob = async (
  jobTitle,
  jobDescription,
  uplodDate,
  companyName,
  address,
  peopleNeeded,
  salary,
  deadline,
  email,
  phoneNumber,
  imagePath
) => {
  try {
    let query, params;

    if (imagePath) {
      query =
        "INSERT INTO Jobposting (  jobTitle, description,uplodDate,companyName,companyAddress,peopleNeeded,salary,deadline,email,phoneNumber,imagePath) VALUES (?,?, ?, ?, ?, ?, ?,?,?,?, ?)";
      params = [
        jobTitle,
        jobDescription,
        uplodDate,
        companyName,
        address,
        peopleNeeded,
        salary,
        deadline,
        email,
        phoneNumber,
        downloadURL
      ];
    } else {
      query =
        "INSERT INTO Jobposting (jobTitle, description,uplodDate,companyName,companyAddress,peopleNeeded,salary,deadline,email,phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)";
      params = [
        jobTitle,
        jobDescription,
        uplodDate,
        companyName,
        address,
        peopleNeeded,
        salary,
        deadline,
        email,
        phoneNumber
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
  const query = `SELECT jobPostingId, jobTitle FROM Jobposting`;
  const [result] = await db.query(query);
  return result;
};

exports.getJob = async (jobId) => {
  const [job] = await db.query(
    `SELECT *, DATE_FORMAT(deadline, '%Y-%m-%d') AS deadline,DATE_FORMAT(uplodDate, '%Y-%m-%d') AS uplodDate FROM Jobposting WHERE jobPostingId = ?`,
    [jobId]
  );
  return job.length > 0 ? job[0] : null;
};

exports.updateJob = async (jobId, updatedJob) => {
  const {
    jobTitle,
    jobDescription,
    uplodDate,
    companyName,
    address,
    peopleNeeded,
    salary,
    deadline,
    email,
    phoneNumber
  } = updatedJob;

  const [result] = await db.query(
    `
        UPDATE Jobposting
        SET
        jobTitle=?,
        description=?,
        uploadDate=?,
        companyName=?,
        companyAddress=?,
        peopleNeeded=?,
        salary=?,
        deadline=?,
        email=?,
        phoneNumber=?
    WHERE
            jobpostingId = ?
    `,
    [
      jobTitle,
      jobDescription,
      uplodDate,
      companyName,
      address,
      peopleNeeded,
      salary,
      deadline,
      email,
      phoneNumber,
      jobId,
    ]
  );

  return result.affectedRows;
};
exports.deleteJob = async (jobId) => {
  const [result] = await db.query(
    "DELETE FROM Jobposting WHERE jobPostingId = ?",
    [jobId]
  );

  if (result.affectedRows === 0) {
    return { success: false, message: "No record by the given id" };
  }

  return { success: true, message: "Job deleted successfully" };
};

exports.getAllJobs = async () => {
  const [jobs] = await db.query(
    `SELECT *, DATE_FORMAT(deadline, '%Y-%m-%d') AS deadline  FROM jobposting`
  );
  return jobs;
};

exports.searchJobsBy = async (jobTitle, industry) => {
  try {
    let q = `SELECT *, DATE_FORMAT(deadline, '%Y-%m-%d') AS deadline FROM Jobposting WHERE jobTitle LIKE '%${jobTitle}%'`;
    if (industry != null) {
      q += ` AND industry = '${industry}'`;
    }
    const queryResult = await db.query(q);

    return queryResult[0];
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error;
  }
};
