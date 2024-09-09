const db = require("../config/db");
const xlsx = require("xlsx");
const bcrypt = require("bcrypt");

exports.parseExcelFile = (buffer) => {
  const workbook = xlsx.read(buffer, {
    cellDates: true,
    bookFiles: true,
  });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

exports.createAlumniRecord = async (alumniData, graduationYear) => {
  for (const row of alumniData) {
    const password = row.fullName.split(" ").join("") + "123";
    const hashedPassword = await bcrypt.hash(password, 10);
    const verified = 1;
    const username = row.fullName.split(" ").join("") + graduationYear;
    const personQuery = `
      INSERT INTO Person (fullName, email, gender, password, verified, username)
      VALUES (?, ?, ?, ?, ?,?)
    `;

    const personValues = [
      row.fullName,
      row.email,
      row.gender,
      hashedPassword,
      verified,
      username,
    ];

    const [personResult] = await db.query(personQuery, personValues);
    const personId = personResult.insertId;

    const alumniSql = `
      INSERT INTO Alumni (personId, isNotable)
      VALUES (?, ?)
    `;

    const alumniValues = [personId, 0];
    const [alumniResult] = await db.query(alumniSql, alumniValues);
    const alumniId = alumniResult.insertId;
    const institution = "Bahir Dar University";
    const eduSql = `INSERT INTO Education (alumniId, institution, degree, major, admission, graduatingYear) VALUES (?, ?, ?, ?, ?, ?)`;
    const eduValues = [
      alumniId,
      institution,
      row.degree,
      row.major,
      row.admission,
      graduationYear,
    ];
    await db.query(eduSql, eduValues);
  }
};

exports.fetchSuggestedPostsToAdmin = async () => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Post WHERE suggestToAdmin = ?",
      [1]
    );
    return result;
  } catch (error) {
    throw new Error(
      "Error fetching suggested posts to admin: " + error.message
    );
  }
};
exports.deleteRequest = async (id) => {
  const [result] = await db.query(
    "DELETE FROM TranscriptReservations WHERE reservationId = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    return { success: false, message: "No record by the given id" };
  }

  return { success: true, message: "Document request deleted successfully" };
};
exports.fetchDocRequestList = async () => {
  try {
    const [result] = await db.query(
      "SELECT reservationId as id, status, email, fullName, DATE_FORMAT(reservationDate, '%Y-%m-%d') AS reservationDate FROM TranscriptReservations t JOIN alumni a JOIN person p WHERE a.alumniId = t.alumniId AND a.personId = p.personId"
    );
    return result;
  } catch (error) {
    throw new Error("Error fetching requested transcripts: " + error.message);
  }
};

exports.getYear = async () => {
  try {
    const [result] = await db.query(
      " SELECT graduatingYear as year FROM Education"
    );
    return result;
  } catch (error) {
    throw new Error("Error fetching grduating year: " + error.message);
  }
};
exports.updateTranscriptStatus = async (reqId, reqStatus) => {
  const [result] = await db.query(
    "UPDATE TranscriptReservations SET status = ? WHERE reservationId = ?",
    [reqStatus, reqId]
  );
  if (result.affectedRows === 0) {
    return { success: false, message: "No record by the given id" };
  }

  return { success: true, message: "Transcript request updated successfully" };
};

exports.updatePost = async (postId, suggestedByAdmin) => {
  const suggestToAdmin = suggestedByAdmin ? 1 : 0;
  const [result] = await db.query(
    "UPDATE Post SET suggestToAdmin = ?, suggestedByAdmin = ? WHERE postId = ?",
    [suggestToAdmin, suggestedByAdmin, postId]
  );
  if (result.affectedRows === 0) {
    return { success: false, message: "No record by the given id" };
  }

  return { success: true, message: "Post updated successfully" };
};

exports.fetchSuggestedPostsByAdmin = async () => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Post WHERE suggestedByAdmin = ?",
      [1]
    );
    return result;
  } catch (error) {
    throw new Error(
      "Error fetching suggested posts by admin: " + error.message
    );
  }
};

exports.fetchGeoData = async () => {
  try {
    const [rows, fields] = await db.query(
      "SELECT address, COUNT(*) AS count FROM Alumni GROUP BY address"
    );
    const data = rows.map((result) => ({
      country: result.address,
      count: result.count,
    }));
    return data;
  } catch (error) {
    throw new Error("Error fetching geo data: " + error.message);
  }
};

exports.fetchUserDataByCountry = async (req, res) => {
  try {
    const country = req.query.country; // Extract country from request query
    if (!country) {
      return res.status(400).json({ error: "Country parameter is missing" });
    }
    const userData = await adminService.fetchUserDataByCountry(country);
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data by country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addDonation = async (title, link, description) => {
  try {
    if (!title || !link || !description) {
      throw new Error("Title, link, and description are required fields");
    }

    const donationSql = `
      INSERT INTO Donation (title, link, description)
      VALUES (?, ?, ?)
    `;

    const donationValues = [title, link, description];

    const [donationResult] = await db.query(donationSql, donationValues);

    if (donationResult.insertId) {
      return {
        message: "Donation added successfully",
        donationId: donationResult.insertId,
      };
    } else {
      throw new Error("Failed to add donation");
    }
  } catch (error) {
    throw new Error("Error adding donation: " + error.message);
  }
};

exports.fetchDonations = async () => {
  try {
    const [result] = await db.query("SELECT * FROM Donation");
    return result;
  } catch (error) {
    throw new Error("Error fetching donations: " + error.message);
  }
};

exports.getAlumniList = async () => {
  try {
    const [alumni] = await db.query(
      `SELECT alumniId, fullName, gender, email, verified, isNotable
      FROM Person p JOIN Alumni a 
      WHERE a.personId = p.personId 
      ORDER BY p.createdAt DESC`
    );
    return alumni;
  } catch (error) {
    throw new Error("Error fetching donations: " + error.message);
  }
};

exports.updateVerified = async (alumniID, verified) => {
  try {
    const [{ affectedRows }] = await db.query(
      "UPDATE Person p JOIN Alumni a ON p.personId = a.personId SET verified = ? WHERE alumniID = ?",
      [verified, alumniID]
    );
    return affectedRows;
  } catch (error) {
    throw error;
  }
};

exports.getDegreeCount = async (graduatingYear) => {
  try {
    let query = `
      SELECT
        COUNT(CASE WHEN degree = 'Associate' THEN 1 END) as Associate,
        COUNT(CASE WHEN degree = 'Bachelor' THEN 1 END) as Bachelor,
        COUNT(CASE WHEN degree = 'Master' THEN 1 END) as Master,
        COUNT(CASE WHEN degree = 'Doctorate' THEN 1 END) as Doctorate,
        COUNT(CASE WHEN degree NOT IN ('Associate', 'Bachelor', 'Master', 'Doctorate') THEN 1 END) as Other
      FROM Education `;

    if (graduatingYear != null) {
      query += ` WHERE graduatingYear = ${graduatingYear}`;
    }

    // Execute the query
    const [degreeCounts] = await db.query(query);

    // Return the result
    return degreeCounts;
  } catch (error) {
    throw error;
  }
};

exports.getAdmissionCount = async (graduatingYear) => {
  try {
    let query = `
      SELECT
        COUNT(CASE WHEN admission = 'Extension' THEN 1 END) as Extension,
        COUNT(CASE WHEN admission = 'Regular' THEN 1 END) as Regular,
        COUNT(CASE WHEN admission = 'Summer' THEN 1 END) as Summer,
        COUNT(CASE WHEN admission NOT IN ('Extension', 'Regular', 'Summer') THEN 1 END) as Other
      FROM Education`;
    if (graduatingYear != null) {
      query += ` WHERE graduatingYear = ${graduatingYear}`;
    }

    // Execute the query
    const [result] = await db.query(query);

    // Return the result
    return result;
  } catch (error) {
    throw error;
  }
};

exports.getMajorsCount = async (graduatingYear) => {
  try {
    const year =
      graduatingYear != null ? ` AND graduatingYear = ${graduatingYear}` : "";
    let query = `SELECT major as fieldOfStudy, COUNT(*) as count FROM Education WHERE institution = 'Bahir Dar University' ${year} GROUP BY major ORDER BY count DESC LIMIT 10 
    `;

    // Execute the query
    const [result] = await db.query(query);

    // Return the result
    return result;
  } catch (error) {
    throw error;
  }
};

exports.getJobCount = async () => {
  try {
    let query = `SELECT position as jobTitle, COUNT(*) as count FROM Experience GROUP BY position ORDER BY count DESC LIMIT 10 `;

    // Execute the query
    const [result] = await db.query(query);

    // Return the result
    return result;
  } catch (error) {
    throw error;
  }
};

exports.getIndustryCount = async () => {
  try {
    let query = `SELECT industry, COUNT(*) as count FROM Experience GROUP BY industry ORDER BY count DESC LIMIT 10 `;

    // Execute the query
    const [result] = await db.query(query);

    // Return the result
    return result;
  } catch (error) {
    throw error;
  }
};

exports.getCompanyCount = async () => {
  try {
    const [result] = await db.query(
      `SELECT company, COUNT(*) as count FROM Experience GROUP BY company ORDER BY count DESC LIMIT 10 `
    );

    return result;
  } catch (error) {
    throw error;
  }
};

exports.approveJob = async (jobPostingId) => {
  try {
    await db.query(
      "UPDATE Jobposting SET isApproved = 1 WHERE jobPostingId = ?",
      [jobPostingId]
    );
  } catch (error) {
    throw error;
  }
};

exports.fetchAdminDetailsByPersonId = async (personId) => {
  try {
    const [result] = await db.query(
      `SELECT 
         adminId, 
         role 
       FROM 
         Websiteadmin 
       WHERE 
         personId = ?`,
      [personId]
    );

    if (result.length === 0) {
      throw new Error(`Admin with personId ${personId} not found`);
    }
    return result[0];
  } catch (error) {
    throw new Error("Error fetching admin details: " + error.message);
  }
};
