const db = require("../config/db");
const bcrypt = require("bcrypt");
const transporter = require("../config/mailerConfig");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds); // Return the hashed password
};

// Check if username is already taken
exports.isUserExists = async (username) => {
  try {
    const [rows] = await db.query("SELECT * FROM person WHERE username = ?", [
      username,
    ]);

    return rows.length > 0;
  } catch (err) {
    console.error("Error checking username:", err);
    throw new Error("Database error");
  }
};

exports.getUser = async (username) => {
  try {
    const [rows] = await db.query(`SELECT * FROM person WHERE username = ?`, [
      username,
    ]);
    return rows;
  } catch (err) {
    console.error("Error getting user:", err);
    throw new Error("Database error");
  }
};

exports.isUserActive = async (username) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM person WHERE status = ? AND username = ?",
      ["Active", username]
    );

    return rows.length > 0;
  } catch (err) {
    console.error("Error checking status:", err);
    throw new Error("Database error");
  }
};

exports.activateUser = async (userId, username, password) => {
  try {
    const hashedPassword = await hashPassword(password);

    const [rows] = await db.query(
      "UPDATE person SET status = ?, username = ?, password = ? WHERE personId = ?",
      ["Active", username, hashedPassword, userId]
    );

    return rows.length > 0;
  } catch (err) {
    console.error("Error activating user:", err);
    throw new Error("Database error");
  }
};

exports.fetchAlumniDetailsByPersonId = async (personId) => {
  try {
    const [result] = await db.query(
      `SELECT 
         alumniId
       FROM 
         Alumni 
       WHERE 
         personId = ?`,
      [personId]
    );

    if (result.length === 0) {
      throw new Error(`Alumni with personId ${personId} not found`);
    }
    return result[0];
  } catch (error) {
    throw new Error("Error fetching alumni details: " + error.message);
  }
};

exports.fakereset = async ({ newpass, personId }) => {
  const hashedPassword = await bcrypt.hash(newpass, 10);

  await db.query("UPDATE Person SET password = ? WHERE personId = ?", [
    hashedPassword,
    personId,
  ]);
};

exports.addUser = async (alumniData) => {
  if (alumniData.role === "admin" && !alumniData.adminRole) {
    throw new Error("adminRole not provided for admin user");
  }

  const hashedPassword = await bcrypt.hash(alumniData.password, 10);
  const isAdmin = alumniData.role === "admin" ? 1 : 0;

  console.log("Alumni data", alumniData);

  await db.query(
    `
    INSERT INTO Person (fullName, gender, email, username, password, verified, isAdmin)
    VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [
      alumniData.fullName,
      alumniData.gender,
      alumniData.email,
      alumniData.username,
      hashedPassword,
      1,
      isAdmin,
    ]
  );

  if (alumniData.role === "alumni") {
    await db.query(
      `INSERT INTO Alumni (personId, isNotable)
      VALUES (LAST_INSERT_ID(), ?);`,
      [0]
    );

    await db.query(
      `INSERT INTO Custom (alumniId)
      VALUES (LAST_INSERT_ID());`
    );
  } else if (alumniData.role === "admin") {
    await db.query(
      `
      INSERT INTO Websiteadmin (personId, role)
      VALUES (LAST_INSERT_ID(), ?);`,
      [alumniData.adminRole]
    );
  } else {
    console.log(alumniData.role);
    throw new Error("Unsupported role");
  }
};

exports.authenticateUser = async (username, password, isAdmin) => {
  try {
    let result;
    if (isAdmin) {
      [result] = await db.query(
        "SELECT * FROM Person WHERE username = ? AND verified = ? AND isAdmin = ?",
        [username, 1, 1]
      );
    } else {
      [result] = await db.query(
        "SELECT * FROM Person WHERE username = ? AND verified = ?",
        [username, 1]
      );
    }

    if (result.length > 0) {
      const hashedPassword = result[0].password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        const userId = result[0].personId;
        await db.query(
          "UPDATE Person SET lastLogin = CURRENT_TIMESTAMP WHERE personId = ?",
          [userId]
        );

        return { success: true };
      }
    }
    return { success: false };
  } catch (error) {
    console.error(error);
    throw new Error("Authentication failed");
  }
};

exports.getAlumniProfile = async (id) => {
  try {
    let result;

    if (!isNaN(id)) {
      result = await db.query(
        `SELECT *
        FROM Alumni
        JOIN Person ON Alumni.personId = Person.personId
        WHERE Alumni.personId = ?;`,
        [id]
      );
    } else {
      result = await db.query(
        `SELECT *
        FROM Alumni
        JOIN Person ON Alumni.personId = Person.personId
        WHERE Person.username = ?;`,
        [id]
      );
    }

    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving alumni information:", error);
    return null;
  }
};

exports.getAdminProfile = async (id) => {
  try {
    let result;

    if (!isNaN(id)) {
      result = await db.query(
        `SELECT *
        FROM Websiteadmin
        JOIN Person ON Websiteadmin.personId = Person.personId
        WHERE Websiteadmin.personId = ?;`,
        [id]
      );
    } else {
      result = await db.query(
        `SELECT *
        FROM Websiteadmin
        JOIN Person ON Websiteadmin.personId = Person.personId
        WHERE Person.username = ?;`,
        [id]
      );
    }

    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving admin information:", error);
    return null;
  }
};
exports.getAllAlumni = async () => {
  try {
    const queryResult = await db.query(`
      SELECT 
          p.username, 
          p.fullName AS name, 
          a.profilePicture 
      FROM 
          Person p
      JOIN 
          Alumni a 
      ON 
          p.personId = a.personId
  `);

    return queryResult[0];
  } catch (error) {
    console.error("Error fetching alumni:", error);
    throw error;
  }
};

exports.getAlumniProfilePhotoById = async function (alumniID) {
  try {
    const queryResult = await db.query(
      "SELECT profilePicture FROM Alumni WHERE alumniID = ?",
      [alumniID]
    );

    if (queryResult.length > 0) {
      return queryResult[0][0].profilePicture;
    }
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
};

exports.updateAlumniProfilePhoto = async (alumniID, profilePhoto) => {
  try {
    const [{ affectedRows }] = await db.query(
      "UPDATE Alumni SET profilePicture = ? WHERE alumniId = ?",
      [profilePhoto, alumniID]
    );
    return affectedRows;
  } catch (error) {
    console.error("Error updating alumni profile photo:", error);
    throw error;
  }
};

exports.getAlumniCoverPhotoById = async function (alumniID) {
  try {
    const queryResult = await db.query(
      "SELECT coverPicture FROM Alumni WHERE alumniID = ?",
      [alumniID]
    );

    if (queryResult.length > 0) {
      return queryResult[0][0].coverPicture;
    }
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
};

exports.updateAlumniCoverPhoto = async (alumniID, coverPhoto) => {
  try {
    const [{ affectedRows }] = await db.query(
      "UPDATE Alumni SET coverPicture = ? WHERE alumniId = ?",
      [coverPhoto, alumniID]
    );
    return affectedRows;
  } catch (error) {
    console.error("Error updating alumni cover photo:", error);
    throw error;
  }
};

exports.updateAlumni = async (id, alumniData) => {
  try {
    const {
      fullName,
      gender,
      email,
      phoneNumber,
      username,
      bio,
      currentLocation,
      socialMedia,
    } = alumniData;

    const { alumniId, personId } = id;

    await db.query(
      `UPDATE Person
       SET fullName = ?, gender = ?, email = ?, username = ?
       WHERE personId = ?`,
      [fullName, gender, email, username, personId]
    );

    const socialMediaJson = JSON.stringify(socialMedia);

    await db.query(
      `UPDATE Alumni
       SET currentLocation = ?, socialMedia = ?, phoneNumber = ?, bio = ?
       WHERE alumniId = ?`,
      [currentLocation, socialMediaJson, phoneNumber, bio, alumniId]
    );

    return { success: true };
  } catch (error) {
    console.error("Error updating alumni:", error);
    throw error;
  }
};

exports.isUsernameTaken = async (username, alumniID = null) => {
  try {
    let query = "SELECT COUNT(*) as count FROM Person WHERE username = ?";

    const params = [username];

    if (alumniID !== null) {
      query += " AND personId <> ?";
      params.push(alumniID);
    }

    const [rows] = await db.query(query, params);

    const count = rows[0].count;
    return count > 0;
  } catch (error) {
    throw error;
  }
};

exports.isEmailTaken = async (email, alumniID = null) => {
  try {
    let query = "SELECT COUNT(*) as count FROM Person WHERE email = ?";

    const params = [email];

    if (alumniID !== null) {
      query += " AND personId <> ?";
      params.push(alumniID);
    }

    const [rows] = await db.query(query, params);

    const count = rows[0].count;
    return count > 0;
  } catch (error) {
    throw error;
  }
};

exports.deleteAlumni = async (id) => {
  try {
    const result = await db.query("DELETE FROM Person WHERE personID = ?", [
      id,
    ]);
    return result[0].affectedRows;
  } catch (error) {
    throw error;
  }
};

exports.changePassword = async (personID, oldPassword, newPassword) => {
  // not working i am so confused
  try {
    const [result] = await db.query(
      "SELECT password FROM Person WHERE personID = ?",
      personID
    );
    if (!result || !result.length) {
      throw new Error("Person not found");
    }
    const hashedPassword = result[0].password;
    console.log(hashedPassword);
    console.log(oldPassword);
    const passwordMatch = await bcrypt.compare(oldPassword, hashedPassword);
    console.log(passwordMatch);

    if (!passwordMatch) {
      throw new Error("Current password is incorrect");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const [{ affectedRows }] = await db.query(
      "UPDATE Person SET password = ? WHERE personID = ?",
      [newHashedPassword, personID]
    );

    return affectedRows;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

exports.getNotable = async () => {
  try {
    let query =
      "SELECT fullName, username, profilePicture, alumniId, isNotable FROM Person p JOIN Alumni a WHERE a.alumniId = p.personId AND isNotable = 1";

    const [notableAlumni] = await db.query(query);

    return notableAlumni;
  } catch (error) {
    throw error;
  }
};

exports.updateNotable = async (alumniID, isNotable) => {
  try {
    const [{ affectedRows }] = await db.query(
      "UPDATE Alumni SET isNotable = ? WHERE alumniID = ?",
      [isNotable, alumniID]
    );
    return affectedRows;
  } catch (error) {
    console.error("Error updating notable:", error);
    throw error;
  }
};

exports.sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: "bahirdarstemalumni@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error;
  }
};

exports.sendConfirmation = async (email) => {
  try {
    const [result] = await db.query(
      "SELECT COUNT(*) AS userCount FROM Person WHERE email = ?",
      [email]
    );
    const userCount = result[0].userCount;

    if (userCount > 0) {
      const confirmationToken = generateConfirmationToken(email);

      return confirmationToken;
    } else {
      throw new Error("User with the provided email address does not exist.");
    }
  } catch (error) {
    console.error("Error changing password to default:", error);
    throw error;
  }
};

function generateConfirmationToken(email) {
  const token = jwt.sign({ email }, process.env.secretKey, { expiresIn: "1h" });
  return token;
}

exports.confirmPasswordChange = async function (
  email,
  confirmationToken,
  newPassword
) {
  try {
    const decoded = jwt.verify(confirmationToken, process.env.secretKey);
    const { email: tokenEmail } = decoded;

    if (tokenEmail !== email) {
      throw new Error("Invalid confirmation token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE Person SET password = ? WHERE email = ?", [
      hashedPassword,
      email,
    ]);

    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    console.error("Error confirming password change:", error);
    return { success: false, error: "Invalid or expired confirmation token" };
  }
};

exports.updateCustom = async (alumniId, privacyData) => {
  try {
    const { phoneNumber, recieveNewsLetter } = privacyData;
    await db.query(
      `UPDATE Custom SET showPhoneNumber = ?, recieveNewsLetter = ? WHERE alumniId = ?`,
      [phoneNumber, recieveNewsLetter, alumniId]
    );
    return { success: true, message: "Custom settings updated successfully." };
  } catch (error) {
    console.error("Error updating custom: ", error);
    throw error;
  }
};

exports.getAlumniDirectory = async (name, searchBy, searchByValue) => {
  try {
    let q = `SELECT fullName, username FROM Person p JOIN Alumni a ON p.personId = a.personId `;

    let conditions = [`LOWER(p.fullName) LIKE LOWER(?)`]; // Always search by name
    let params = [name];

    if (searchBy && searchByValue) {
      if (
        searchBy === "department" ||
        searchBy === "degree" ||
        searchBy === "graduatingYear"
      ) {
        q += `JOIN Education ed ON ed.alumniId = a.alumniId `;

        if (searchBy === "department") {
          conditions.push(`LOWER(ed.major) LIKE LOWER(?)`);
        } else if (searchBy === "degree") {
          conditions.push(`LOWER(ed.degree) LIKE LOWER(?)`);
        } else if (searchBy === "graduatingYear") {
          conditions.push(`ed.graduatingYear = ?`);
        }
      } else if (searchBy === "industry") {
        q += `JOIN Experience ex ON ex.alumniId = a.alumniId `;
        conditions.push(`LOWER(ex.industry) LIKE LOWER(?)`);
      } else if (searchBy === "location") {
        conditions.push(`LOWER(a.currentLocation) LIKE LOWER(?)`);
      }
      params.push(searchByValue);
    }

    q += ` WHERE ` + conditions.join(" AND ");

    const queryResult = await db.query(q, params);

    return queryResult[0];
  } catch (error) {
    console.error("Error fetching alumni:", error);
    throw error;
  }
};

exports.reserveTranscriptPlace = async (alumniId) => {
  const [result] = await db.query(
    "INSERT INTO TranscriptReservations (alumniId) VALUES (?)",
    [alumniId]
  );

  if (result.affectedRows > 0) {
    console.log(`Reserved place for studentId: ${alumniId}`);
    return true;
  } else {
    console.log(`Failed to reserve place for studentId: ${alumniId}`);
    return false;
  }
};
