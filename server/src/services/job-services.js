const db = require("../config/db");

exports.addJob = async (jobDetails, personId, userRole) => {
  try {
    const isApproved =
      userRole === "systemAdmin" || userRole === "contentManager" ? 1 : 0;

    const [result] = await db.query(
      "INSERT INTO Jobposting (jobTitle, description,companyName,deadline,jobLink,isApproved, personId) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        jobDetails.jobTitle,
        jobDetails.jobDescription,
        jobDetails.companyName,
        jobDetails.deadline,
        jobDetails.jobLink || "",
        isApproved,
        personId,
      ]
    );

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
    DATE_FORMAT(deadline, '%Y-%m-%d') AS deadline, 
    DATE_FORMAT(Jobposting.createdAt, '%Y-%m-%d') AS createdAt, 
    DATE_FORMAT(Jobposting.updatedAt, '%Y-%m-%d') AS updatedAt, 
    Person.fullName, 
    Person.username, 
    Alumni.profilePicture,
    WebsiteAdmin.role
FROM Jobposting
LEFT JOIN Person ON Jobposting.personId = Person.personId
LEFT JOIN Alumni ON Person.personId = Alumni.personId
LEFT JOIN WebsiteAdmin ON Jobposting.personId = WebsiteAdmin.personId
;

`);

  return result;
};

exports.getJob = async (jobId) => {
  const [job] = await db.query(
    `SELECT *, DATE_FORMAT(deadline, '%Y-%m-%d') AS deadline,DATE_FORMAT(createdAt, '%Y-%m-%d') AS createdAt, DATE_FORMAT(updatedAt, '%Y-%m-%d') AS updatedAt FROM Jobposting WHERE jobPostingId = ?`,
    [jobId]
  );
  return job.length > 0 ? job[0] : null;
};

exports.updateJob = async (jobId, updatedJob) => {
  const { jobTitle, jobDescription, companyName, deadline, jobLink } =
    updatedJob;

  const [result] = await db.query(
    `
        UPDATE Jobposting
        SET
        jobTitle=?,
        description=?,
        companyName=?,
        deadline=?,
        jobLink=?
    WHERE
            jobpostingId = ?
    `,
    [jobTitle, jobDescription, companyName, deadline, jobLink || "", jobId]
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
    `SELECT j.*, DATE_FORMAT(deadline, '%Y-%m-%d') AS deadline, DATE_FORMAT(j.createdAt, '%Y-%m-%d') AS createdAt, DATE_FORMAT(updatedAt, '%Y-%m-%d') AS updatedAt FROM jobposting j, person p WHERE j.personId = p.personId and p.isAdmin= ? `,
    [1]
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
