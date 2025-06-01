const db = require("../config/db");
const bcrypt = require("bcrypt");
const transporter = require("../config/mailerConfig");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds); // Return the hashed password
};

/**
 * Sends an activation email to the user.
 * @param {string} username - The username (used to fetch email).
 * @param {string} activationToken - The JWT activation token.
 */
exports.sendActivationEmail = async (username, activationToken) => {
  try {
    // Assume we fetch the email from the database using the username
    const user = await this.getUser(username);

    const email = user[0].email; // Extract user's email

    // Construct activation link
    const activationLink = `${process.env.FRONTEND_URL}/activate/${activationToken}`;

    // Email content
    const mailOptions = {
      from: process.env.G_MAIL_USER,
      to: email,
      subject: "Activate Your Account",
      html: `
        <h2>Welcome to the Bahir Dar University Alumni Website</h2>
        <p>Click the link below to activate your account:</p>
        <a href="${activationLink}" style="display: inline-block; padding: 10px 20px; background-color: #037cd3; color: white; text-decoration: none; border-radius: 5px;">Activate Account</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Activation email sent to ${email}`);
  } catch (error) {
    console.error("Error sending activation email:", error);
    throw new Error("Failed to send activation email");
  }
};
exports.sendEmail = async (to, subject, text, htmlContent) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
exports.subscribeUser = async (email) => {
  try {
    // Check if email already exists
    const [existing] = await db.query(
      "SELECT subscriptionId FROM subscription WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return { message: "Email is already subscribed." };
    }

    // Insert new subscription
    const [result] = await db.query(
      "INSERT INTO subscription (email) VALUES (?)",
      [email]
    );

    if (result.affectedRows > 0) {
      return { message: "Subscription successful." };
    } else {
      return { message: "Subscription failed." };
    }
  } catch (err) {
    console.error("Error adding subscription:", err);
    return { message: "Database error." };
  }
};

exports.unsubscribeUser = async (email) => {
  try {
    const [result] = await db.query(
      "DELETE FROM subscription WHERE email = ?",
      [email]
    );

    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

exports.getSubscribers = async () => {
  try {
    const [subscribers] = await db.query("SELECT email FROM subscription");
    return subscribers.map((sub) => sub.email);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
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

exports.activateUser = async (userId, password) => {
  try {
    // Check if the user exists
    const [user] = await db.query(
      "SELECT status, password FROM person WHERE personId = ?",
      [userId]
    );

    if (user.length === 0) {
      throw new Error("User not found");
    }

    // Check if the user is already active
    if (user[0].status === "Active") {
      return { success: false, message: "User is already active" };
    }

    // Compare the old password with the new password
    const isPasswordSame = await bcrypt.compare(password, user[0].password);

    if (isPasswordSame) {
      return { success: false, message: "Password is the same" };
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password);

    // Update the user's status and password
    const [rows] = await db.query(
      "UPDATE person SET status = ?, password = ? WHERE personId = ?",
      ["Active", hashedPassword, userId]
    );

    return {
      success: rows.affectedRows > 0,
      message: "User activated successfully",
    };
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

exports.createUser = async (alumniData) => {
  try {
    if (alumniData.role === "admin" && !alumniData.adminRole) {
      throw new Error("adminRole not provided for admin user");
    }

    const hashedPassword = await bcrypt.hash(alumniData.password, 10);
    const isAdmin = alumniData.role === "admin" ? 1 : 0;
    const status = isAdmin ? "Active" : "Inactive";

    // Insert into Person and get the inserted ID
    const [personResult] = await db.query(
      `INSERT INTO Person (fullName, gender, email, username, password, verified, isAdmin, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        alumniData.fullName,
        alumniData.gender,
        alumniData.email,
        alumniData.username,
        hashedPassword,
        1,
        isAdmin,
        status,
      ]
    );

    const personId = personResult.insertId; // Get the last inserted ID

    if (!personId) {
      throw new Error("Failed to insert person");
    }

    if (alumniData.role === "alumni") {
      await db.query(
        `INSERT INTO Alumni (personId, isNotable) VALUES (?, ?);`,
        [personId, 0]
      );

      await db.query(`INSERT INTO Custom (alumniId) VALUES (?);`, [personId]);
    } else if (alumniData.role === "admin") {
      await db.query(
        `INSERT INTO Websiteadmin (personId, role) VALUES (?, ?);`,
        [personId, alumniData.adminRole]
      );
    } else {
      throw new Error("Unsupported role");
    }

    return personId;
  } catch (error) {
    console.error("Error adding user:", error.message);

    throw error;
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

exports.getAlumniProfilePhotoById = async function (personId) {
  try {
    const queryResult = await db.query(
      "SELECT profilePicture FROM Alumni WHERE personId = ?",
      [personId]
    );

    if (queryResult.length > 0) {
      return queryResult[0][0].profilePicture;
    }
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
};

exports.updateAlumniProfilePhoto = async (personId, profilePhoto) => {
  try {
    const [{ affectedRows }] = await db.query(
      "UPDATE Alumni SET profilePicture = ? WHERE personId = ?",
      [profilePhoto, personId]
    );
    return affectedRows;
  } catch (error) {
    console.error("Error updating alumni profile photo:", error);
    throw error;
  }
};

exports.getAlumniCoverPhotoById = async function (personId) {
  try {
    const queryResult = await db.query(
      "SELECT coverPicture FROM Alumni WHERE personId = ?",
      [personId]
    );

    if (queryResult.length > 0) {
      return queryResult[0][0].coverPicture;
    }
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
};

exports.updateAlumniCoverPhoto = async (personId, coverPhoto) => {
  try {
    const [{ affectedRows }] = await db.query(
      "UPDATE Alumni SET coverPicture = ? WHERE personId = ?",
      [coverPhoto, personId]
    );
    return affectedRows;
  } catch (error) {
    console.error("Error updating alumni cover photo:", error);
    throw error;
  }
};

exports.updateAlumni = async (personId, alumniData) => {
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

    if (!personId) {
      throw new Error("Missing personId.");
    }

    // Update Person table
    const [personResult] = await db.query(
      `UPDATE Person
       SET fullName = ?, gender = ?, email = ?, username = ?
       WHERE personId = ?`,
      [fullName, gender, email, username, personId]
    );

    const socialMediaJson = JSON.stringify(socialMedia);

    const [alumniResult] = await db.query(
      `UPDATE Alumni
       SET currentLocation = ?, socialMedia = ?, phoneNumber = ?, bio = ?
       WHERE personId = ?`,
      [currentLocation, socialMediaJson, phoneNumber, bio, personId]
    );

    // Sum affected rows from both updates
    const affectedRows =
      (personResult.affectedRows || 0) + (alumniResult.affectedRows || 0);
    return affectedRows;
  } catch (error) {
    console.error("Error updating alumni:", error.message);
    throw error;
  }
};

exports.isUsernameTaken = async (username, personId = null) => {
  try {
    let query = "SELECT COUNT(*) as count FROM Person WHERE username = ?";

    const params = [username];

    if (personId !== null) {
      query += " AND personId <> ?";
      params.push(personId);
    }

    const [rows] = await db.query(query, params);

    const count = rows[0].count;
    return count > 0;
  } catch (error) {
    throw error;
  }
};

exports.isEmailTaken = async (email, personId = null) => {
  try {
    let query = "SELECT COUNT(*) as count FROM Person WHERE email = ?";

    const params = [email];

    if (personId !== null) {
      query += " AND personId <> ?";
      params.push(personId);
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

exports.checkUserPassword = async (personId, oldPassword) => {
  try {
    const [result] = await db.query(
      "SELECT password FROM Person WHERE personId = ?",
      [personId]
    );

    if (!result.length) return false;

    const hashedPassword = result[0].password;
    const passwordMatch = await bcrypt.compare(oldPassword, hashedPassword);

    return passwordMatch;
  } catch (error) {
    console.error("Error checking password:", error);
    throw error;
  }
};

exports.changeUserPassword = async (personId, newPassword) => {
  try {
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await db.query(
      "UPDATE Person SET password = ? WHERE personId = ?",
      [newHashedPassword, personId]
    );

    return result.affectedRows > 0;
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

exports.getAlumniByEmail = async (email) => {
  try {
    const [result] = await db.query(
      " SELECT * FROM Alumni JOIN Person ON Alumni.personId = Person.personId WHERE Person.email = ?",
      email
    );

    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
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

exports.respondAlumniId = async (personId) => {
  try {
    let query = "SELECT alumniId FROM Alumni WHERE personId = ?";

    const [result] = await db.query(query, personId);

    return result[0].alumniId;
  } catch (error) {
    throw error;
  }
};

exports.reserveTranscriptPlace = async (personId) => {
  const alumniId = await this.respondAlumniId(personId);
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
