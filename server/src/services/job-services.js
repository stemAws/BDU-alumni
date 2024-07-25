const db = require("../config/db");

exports.addJob = async (imagePath, {jobTitle, jobDescription, uploadDate, companyName, address, peopleNeeded, salary, deadline, email, phoneNumber}, alumniwhoposteditId) => {
  try {
    const [result] = await db.query("INSERT INTO Jobposting (  jobTitle, description,companyName,companyAddress,peopleNeeded,salary,deadline,email,phoneNumber,personId, imagePath) VALUES (?,?, ?, ?, ?, ?, ?, ?,?,?, ?)", [
      jobTitle,
      jobDescription,
      companyName,
      address,
      peopleNeeded,
      salary,
      deadline,
      email,
      phoneNumber,
      alumniwhoposteditId,
      imagePath
    ]);

    return result.insertId;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
};

exports.getJobs = async () => {
  const [result] = await db.query(`
    SELECT 
        Jobposting.*, 
        Person.fullName, 
        Person.username, 
        Alumni.profilePicture
    FROM Jobposting
    LEFT JOIN Person ON Jobposting.personId = Person.personId
    LEFT JOIN Alumni ON Person.personId = Alumni.personId
`);

  return result;
};

exports.getJob = async (jobId) => {
  const [job] = await db.query(
    `SELECT *, DATE_FORMAT(deadline, '%Y-%m-%d') AS deadline,DATE_FORMAT(uploadDate, '%Y-%m-%d') AS uploadDate FROM Jobposting WHERE jobPostingId = ?`,
    [jobId]
  );
  return job.length > 0 ? job[0] : null;
};

exports.updateJob = async (jobId, updatedJob) => {
  const {
    jobTitle,
    jobDescription,
    uploadDate,
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
      uploadDate,
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
