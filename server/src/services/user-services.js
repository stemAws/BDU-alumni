const db = require("../config/db"), bcrypt = require("bcrypt"), transporter = require('../config/mailerConfig')

exports.getAlumniID = async (username) => {
  const [result] = await db.query(
    "SELECT alumniID FROM alumni WHERE username = ?",
    [username]
  );
  const alumniID = result[0] ? result[0].alumniID : null;

  return alumniID;
};

exports.getAlumni = async (username) => {
  const [result] = await db.query(
    "SELECT alumniID FROM alumni WHERE username = ?",
    [username]
  );
  const alumniID = result[0] ? result[0].alumniID : null;

  return alumniID;
};

exports.getAllAlumni = async () => {
  try {
    const queryResult = await db.query(
      "SELECT username, CONCAT(firstName, ' ', lastName) AS name FROM alumni"
    );

    const alumniArray = queryResult[0];

    return alumniArray;
  } catch (error) {
    console.error("Error fetching alumni:", error);
    throw error;
  }
};

exports.GetAlumniDetailsByID = async (id) => {
  try {
    const [alumni] = await db.query(
      `
      SELECT *, 
        DATE_FORMAT(dateOfBirth, '%Y-%m-%d') AS dateOfBirth
      FROM alumni 
      WHERE alumniID = ?
      `,
      [id]
    );

    return alumni;
  } catch (error) {
    console.error("Error fetching alumni details by ID:", error);
    throw error;
  }
};

exports.deleteAlumni = async (id) => {
  try {
    const [checkRows] = await db.query(
      "SELECT COUNT(*) AS count FROM alumni WHERE alumniID = ?",
      [id]
    );
    const alumniExists = checkRows[0]?.count > 0;

    if (alumniExists) {
      const [studentRows] = await db.query(
        "SELECT COUNT(*) AS count FROM student WHERE alumniID = ?",
        [id]
      );
      const isStudent = studentRows[0]?.count > 0;

      const [staffRows] = await db.query(
        "SELECT COUNT(*) AS count FROM staff WHERE alumniID = ?",
        [id]
      );
      const isStaff = staffRows[0]?.count > 0;

      if (isStudent) {
        await db.query("DELETE FROM student WHERE alumniID = ?", [id]);
      }

      if (isStaff) {
        await db.query("DELETE FROM staff WHERE alumniID = ?", [id]);
      }

      const [{ affectedRows }] = await db.query(
        "DELETE FROM alumni WHERE alumniID = ?",
        [id]
      );

      return affectedRows;
    } else {
      // alumninot found
      throw new Error("Alumni not found for the given alumniID");
    }
  } catch (error) {
    console.error("Error deleting alumni:", error);
    throw error;
  }
};

exports.addAlumni = async (alumniData) => {
  const {firstName, lastName, gender, email, role, username, password, graduationYear, staffRole, hiredDate, leftDate,
  } = alumniData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [alumniResult] = await db.query(
    "INSERT INTO alumni(firstName, lastName, email, role, username, password, gender) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstName, lastName, email, role, username, hashedPassword, gender]
  );

  const lastInsertedID = alumniResult.insertId;

  if (role === "Student") {
    const [{ affectedRows }] = await db.query(
      "INSERT INTO student (alumniID, graduationYear) VALUES (?, ?)",
      [lastInsertedID, graduationYear]
    );
    roleAffectedRows = affectedRows;
  } else if (role === "Staff") {
    const [{ affectedRows }] = await db.query(
      "INSERT INTO staff (alumniID, role, hiredDate, leftDate) VALUES (?, ?, ?, ?)",
      [lastInsertedID, staffRole, hiredDate, leftDate]
    );
    roleAffectedRows = affectedRows;
  }

  return roleAffectedRows;
};

exports.updateAlumni = async (id, alumniData) => {
  try {
    const {firstName, lastName, gender, dateOfBirth, email, phoneNumber, address, additionalInfo, username, enrollmentYear, graduationYear, staffRole, hiredDate, leftDate, socialMediaHandles} = alumniData;

    const [{ affectedRows: alumniAffectedRows }] = await db.query(
      "UPDATE alumni SET firstName=?, lastName=?, gender=?, dateOfBirth=?, email=?, phoneNumber=?, address=?, additionalInfo=?, username=?, socialMediaHandles=? WHERE alumniID=?",
      [firstName, lastName, gender, dateOfBirth, email, phoneNumber, address, additionalInfo, username, JSON.stringify(socialMediaHandles), id]
    );

    const [{ role }] = await db.query(
      "SELECT role FROM alumni WHERE alumniID=?",
      [id]
    );

    let roleAffectedRows = 0;

    if (role === "Student") {
      const [{ affectedRows }] = await db.query(
        "UPDATE student SET enrollmentYear=?, graduationYear=? WHERE alumniID=?",
        [enrollmentYear, graduationYear, id]
      );
      roleAffectedRows = affectedRows;
    } else if (role === "Staff") {
      const [{ affectedRows }] = await db.query(
        "UPDATE staff SET role=?, hiredDate=?, leftDate=? WHERE alumniID=?",
        [staffRole, hiredDate, leftDate, id]
      );
      roleAffectedRows = affectedRows;
    }

    return alumniAffectedRows + roleAffectedRows;
  } catch (error) {
    console.error("Error updating alumni:", error);
    throw error;
  }
};

exports.authenticateUser = async (username, password) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM alumni WHERE username = ? AND verified = 1",
      [username]
    );

    if (result.length > 0) {
      const hashedPassword = result[0].password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        const userId = result[0].alumniID;
        await db.query(
          "UPDATE alumni SET lastLogin = CURRENT_TIMESTAMP WHERE alumniID = ?",
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

exports.authenticateAdmin = async (req, username, password) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM alumni WHERE username = ? AND verified = 1 AND isAdmin = 1",
      [username]
    );

    if (result.length > 0) {
      const hashedPassword = result[0].password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        return { success: true };
      }
    }
    return { success: false };
  } catch (error) {
    console.error(error);
    throw new Error("Authentication failed");
  }
};

exports.updateAlumniProfilePhoto = async (alumniID, profilePhoto) => {
  try {
    const [{ affectedRows }] = await db.query(
      "UPDATE alumni SET profilePhoto = ? WHERE alumniID = ?",
      [profilePhoto, alumniID]
    );
    return affectedRows;
  } catch (error) {
    console.error("Error updating alumni profile photo:", error);
    throw error;
  }
};

exports.updateAlumniCoverPhoto = async (alumniID, coverPhoto) => {
  try {
    const [{ affectedRows }] = await db.query(
      "UPDATE alumni SET coverPhoto = ? WHERE alumniID = ?",
      [coverPhoto, alumniID]
    );
    return affectedRows;
  } catch (error) {
    console.error("Error updating alumni cover photo:", error);
    throw error;
  }
};

exports.getAlumniByUsername = async (username) => {
  try {
    const [alumni] = await db.query(
      `SELECT *, DATE_FORMAT(dateOfBirth, '%Y-%m-%d') AS dateOfBirth FROM alumni WHERE username = ?`,
      [username]
    );
    return alumni.length > 0 ? alumni[0] : null;
  } catch (error) {
    console.error("Error fetching alumni by username:", error);
    throw error;
  }
};

exports.getAlumniProfilePhotoById = async (alumniID) => {
  try {
    const [alumni] = await db.query(
      "SELECT profilePhoto FROM alumni WHERE alumniID = ?",
      [alumniID]
    );
    return alumni.length > 0 ? alumni[0].profilePhoto : null;
  } catch (error) {
    console.error("Error fetching alumni profile photo:", error);
    throw error;
  }
};

exports.getAlumniCoverPhotoById = async (alumniID) => {
  try {
    const [alumni] = await db.query(
      "SELECT coverPhoto FROM alumni WHERE alumniID = ?",
      [alumniID]
    );
    return alumni.length > 0 ? alumni[0].coverPhoto : null;
  } catch (error) {
    console.error("Error fetching alumni cover photo:", error);
    throw error;
  }
};

exports.getAlumniData = async (username) => {
  try {
    const [alumniData] = await db.query(
      `SELECT a.*, 
      s.graduationYear,
      st.role as staffRole,
      DATE_FORMAT(a.dateOfBirth, '%Y-%m-%d') AS dateOfBirth
      FROM alumni a
      LEFT JOIN student s ON a.alumniID = s.alumniID
      LEFT JOIN staff st ON a.alumniID = st.alumniID
      WHERE a.username = ?`,
      [username]
    );

    return alumniData;
  } catch (error) {
    throw error;
  }
};

exports.isUsernameTaken = async (username, alumniID = null) => {
  try {
    let query = "SELECT COUNT(*) as count FROM alumni WHERE username = ?";

    const params = [username];

    if (alumniID !== null) {
      query += " AND alumniID <> ?";
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
    let query = "SELECT COUNT(*) as count FROM alumni WHERE email = ?";

    const params = [email];

    if (alumniID !== null) {
      query += " AND alumniID <> ?";
      params.push(alumniID);
    }

    const [rows] = await db.query(query, params);

    const count = rows[0].count;
    return count > 0;
  } catch (error) {
    throw error;
  }
};

exports.changePassword = async (alumniID, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [{ affectedRows }] = await db.query(
      "UPDATE alumni SET password = ? WHERE alumniID = ?",
      [hashedPassword, alumniID]
    );
    return affectedRows;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

exports.getPassword = async (alumniID, oldPassword) => {
  try {
    const result = await db.query("SELECT password FROM alumni WHERE alumniID = ?", alumniID);

    const password = result[0][0].password;

    console.log("Plain text password:", oldPassword);
    console.log("Hashed password from database:", password);

    const passwordMatch = await bcrypt.compare(oldPassword, password);

    return passwordMatch;
  } catch (error) {
    throw error;
  }
};

exports.getNotable = async () => {
  try {
    let query = "SELECT firstName, lastName, profilePhoto FROM alumni WHERE notable = 1";

    const [notableAlumni] = await db.query(query);

    return notableAlumni;
  } catch (error) {
    throw error;
  }
};

exports.updateNotable = async (alumniID, isNotable) => {
  try {
    const [{ affectedRows }] = await db.query(
      "UPDATE alumni SET notable = ? WHERE alumniID = ?",
      [isNotable, alumniID]
    );
    return affectedRows;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

exports.sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: 'bahirdarstemalumni@gmail.com',
    to: to,
    subject: subject,
    text: text,
    html: html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    throw error;
  }
}

exports.changepasstodefualt = async (email) => {
  try {
    const [userData] = await db.query("SELECT lastName FROM alumni WHERE email = ?", [email]);

    if (userData.length > 0) {
      const user = userData[0];
      
      const defaultPassword = user.lastName + '123';

      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      await db.query("UPDATE alumni SET password = ? WHERE email = ?", [hashedPassword, email]);

      return defaultPassword;
    } else {
      throw new Error('User with the provided email address does not exist.');
    }
  } catch (error) {
    console.error("Error changing password to default:", error);
    throw error;
  }
}