const db = require("../config/db");

exports.fetchSuggestedPostsToAdmin = async () => {
  try {
    const [result] = await db.query(
      "SELECT * FROM posts WHERE suggestToAdmin = 1"
    );
    return result;
  } catch (error) {
    throw new Error(
      "Error fetching suggested posts to admin: " + error.message
    );
  }
};

exports.updatePost = async (postId, suggestedByAdmin) => {
  try {
    const result = await db.query(
      "UPDATE posts SET suggestToAdmin = 0, suggestedByAdmin = ? WHERE postID = ?",
      [suggestedByAdmin, postId]
    );

    if (result.rowCount === 1) {
      return { message: "Post updated successfully" };
    } else {
      throw new Error("Post not found");
    }
  } catch (error) {
    throw new Error("Error updating post: " + error.message);
  }
};

exports.fetchSuggestedPostsByAdmin = async () => {
  try {
    const [result] = await db.query(
      "SELECT * FROM posts WHERE suggestedByAdmin = 1"
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
      "SELECT address, COUNT(*) AS count FROM alumni GROUP BY address"
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
      INSERT INTO donation (title, link, description)
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
    const [result] = await db.query("SELECT * FROM donation");
    return result;
  } catch (error) {
    throw new Error("Error fetching donations: " + error.message);
  }
};

exports.getAlumniList = async () => {
  try {
    const [alumni] = await db.query(
      "select alumniID, fullName, gender, email, verified, createdAt, isNotable from person p JOIN alumni a where a.personId = p.personId"
    );
    return alumni;
  } catch (error) {
    throw new Error("Error fetching donations: " + error.message);
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
      FROM education `;

    if (graduatingYear != null) {
      query += ` WHERE graduatingYear = ${graduatingYear}`;
    }

    // Execute the query
    const [degreeCounts] = await db.query(query);

    // Return the result
    return degreeCounts;
  } catch (error) {
    console.error("Error fetching degree counts:", error);
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
      FROM education`;
    if (graduatingYear != null) {
      query += ` WHERE graduatingYear = ${graduatingYear}`;
    }

    // Execute the query
    const [result] = await db.query(query);

    // Return the result
    return result;
  } catch (error) {
    console.error("Error fetching admission counts:", error);
    throw error;
  }
};

exports.getMajorsCount = async (graduatingYear) => {
  try {
    const year =
      graduatingYear != null ? ` AND graduatingYear = ${graduatingYear}` : "";
    let query = `SELECT major, COUNT(*) as count FROM education WHERE institution = 'Bahir Dar University' ${year} GROUP BY major ORDER BY count DESC LIMIT 10 
    `;

    // Execute the query
    const [result] = await db.query(query);

    // Return the result
    return result;
  } catch (error) {
    console.error("Error fetching majors counts:", error);
    throw error;
  }
};

exports.getJobCount = async () => {
  try {
    let query = `SELECT position, COUNT(*) as count FROM experience GROUP BY position ORDER BY count DESC LIMIT 10 `;

    // Execute the query
    const [result] = await db.query(query);

    // Return the result
    return result;
  } catch (error) {
    console.error("Error fetching job counts:", error);
    throw error;
  }
};

exports.getIndustryCount = async () => {
  try {
    let query = `SELECT industry, COUNT(*) as count FROM experience GROUP BY industry ORDER BY count DESC LIMIT 10 `;

    // Execute the query
    const [result] = await db.query(query);

    // Return the result
    return result;
  } catch (error) {
    console.error("Error fetching company counts:", error);
    throw error;
  }
};

exports.getCompanyCount = async () => {
  try {
    let query = `SELECT company, COUNT(*) as count FROM experience GROUP BY company ORDER BY count DESC LIMIT 10 `;

    // Execute the query
    const [result] = await db.query(query);

    // Return the result
    return result;
  } catch (error) {
    console.error("Error fetching company counts:", error);
    throw error;
  }
};

