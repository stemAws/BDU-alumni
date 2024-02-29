const db = require('../config/db');
const bcrypt = require("bcrypt");
const transporter = require('../config/mailerConfig')
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.addUser = async (alumniData) => {
  const { fullName, gender, email, role, username, password, verified } = alumniData;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(`
    INSERT INTO Person (fullName, gender, email, username, password, verified)
    VALUES (?, ?, ?, ?, ?, ?);`, [fullName, gender, email, username, hashedPassword, verified]);

  if (role === 'alumni') {
    await db.query(`INSERT INTO Alumni (personId)
    VALUES (LAST_INSERT_ID());`)
  } else if (role === 'admin') {
    await db.query(`
    INSERT INTO WebsiteAdmin (personId)
    VALUES (LAST_INSERT_ID());`)
  } else {
    throw new Error('Unsupported role');
  }
};

exports.authenticateUser = async (username, password, isAdmin) => {
  try {
    let result;
    if(isAdmin){
      [result] = await db.query(
        "SELECT * FROM Person WHERE username = ? AND verified = ? AND isAdmin = ?", [username, 1, 1]);
    }
    else{
      [result] = await db.query(
        "SELECT * FROM Person WHERE username = ? AND verified = ?", [username, 1]);
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
    console.error('Error retrieving alumni information:', error);
    return null;
  }
};


exports.getAllAlumni = async () => {
  try {
    const queryResult = await db.query(
      "SELECT username, fullName name FROM Person"
    );

    return queryResult[0];
  } catch (error) {
    console.error("Error fetching alumni:", error);
    throw error;
  }
};

exports.updateAlumniProfilePhoto = async (alumniID, profilePhoto) => {
  try {
    const [{ affectedRows }] = await db.query(
      "UPDATE person SET profilePhoto = ? WHERE personID = ?",
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
      "UPDATE person SET coverPhoto = ? WHERE personID = ?",
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
    const { fullName, gender, email, phoneNumber, username, bio, currentLocation, isNotable, recieveNewsletter, socialMedia, privacySetting } = alumniData;

    await db.query(
      `UPDATE Person
       SET fullName = ?, gender = ?, email = ?, phoneNumber = ?, username = ?, bio = ?
       WHERE personId = ?`,
      [fullName, gender, email, phoneNumber, username, bio, id]
    );

    await db.query(
      `UPDATE Alumni
       SET currentLocation = ?, isNotable = ?, recieveNewsletter = ?, socialMedia = ?, privacySetting = ?
       WHERE personId = ?`,
      [currentLocation, isNotable, recieveNewsletter, socialMedia, privacySetting, id]
    );

    return { success: true };
  } catch (error) {
    console.error("Error updating alumni:", error);
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


// exports.deleteAlumni = async (id) => {
//   try {
//     const [checkRows] = await db.query(
//       "SELECT COUNT(*) AS count FROM alumni WHERE alumniID = ?",
//       [id]
//     );
//     const alumniExists = checkRows[0]?.count > 0;

//     if (alumniExists) {
//       const [studentRows] = await db.query(
//         "SELECT COUNT(*) AS count FROM student WHERE alumniID = ?",
//         [id]
//       );
//       const isStudent = studentRows[0]?.count > 0;

//       const [staffRows] = await db.query(
//         "SELECT COUNT(*) AS count FROM staff WHERE alumniID = ?",
//         [id]
//       );
//       const isStaff = staffRows[0]?.count > 0;

//       if (isStudent) {
//         await db.query("DELETE FROM student WHERE alumniID = ?", [id]);
//       }

//       if (isStaff) {
//         await db.query("DELETE FROM staff WHERE alumniID = ?", [id]);
//       }

//       const [{ affectedRows }] = await db.query(
//         "DELETE FROM alumni WHERE alumniID = ?",
//         [id]
//       );

//       return affectedRows;
//     } else {
//       // alumninot found
//       throw new Error("Alumni not found for the given alumniID");
//     }
//   } catch (error) {
//     console.error("Error deleting alumni:", error);
//     throw error;
//   }
// };


exports.changePassword = async (personID, oldPassword, newPassword) => { // not working i am so confused
  try {
    const [result] = await db.query("SELECT password FROM person WHERE personID = ?", personID);
    if (!result || !result.length) {
      throw new Error('Person not found');
    }
    const hashedPassword = result[0].password;
    console.log(hashedPassword)
    console.log(oldPassword)
    const passwordMatch = await bcrypt.compare(oldPassword, hashedPassword);
    console.log(passwordMatch)
    
    if (!passwordMatch) {
      throw new Error('Current password is incorrect');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const [{ affectedRows }] = await db.query(
      "UPDATE person SET password = ? WHERE personID = ?",
      [newHashedPassword, personID]);

    return affectedRows;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};



// exports.getNotable = async () => {
//   try {
//     let query = "SELECT firstName, lastName, profilePhoto FROM alumni WHERE notable = 1";

//     const [notableAlumni] = await db.query(query);

//     return notableAlumni;
//   } catch (error) {
//     throw error;
//   }
// };

// exports.updateNotable = async (alumniID, isNotable) => {
//   try {
//     const [{ affectedRows }] = await db.query(
//       "UPDATE alumni SET notable = ? WHERE alumniID = ?",
//       [isNotable, alumniID]
//     );
//     return affectedRows;
//   } catch (error) {
//     console.error("Error updating password:", error);
//     throw error;
//   }
// };

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

exports.sendConfirmation = async (email) => {
  try {
    const [result] = await db.query("SELECT COUNT(*) AS userCount FROM person WHERE email = ?", [email]);
    const userCount = result[0].userCount;

    if (userCount > 0) {      
      const confirmationToken = generateConfirmationToken(email);

      return confirmationToken;
    } else {
      throw new Error('User with the provided email address does not exist.');
    }
  } catch (error) {
    console.error("Error changing password to default:", error);
    throw error;
  }
}

function generateConfirmationToken(email) {
  const token = jwt.sign({email}, process.env.secretKey, { expiresIn: '1h' });
  return token;
}

exports.confirmPasswordChange = async function (email, confirmationToken, newPassword) {
  try {
      const decoded = jwt.verify(confirmationToken, process.env.secretKey);
      const { email: tokenEmail } = decoded;

      if (tokenEmail !== email) {
          throw new Error('Invalid confirmation token');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.query("UPDATE person SET password = ? WHERE email = ?", [hashedPassword, email]);

      return { success: true, message: 'Password changed successfully' };
  } catch (error) {
      console.error('Error confirming password change:', error);
      return { success: false, error: 'Invalid or expired confirmation token' };
  }
};