const alumniService = require("../services/userService");
const jwt = require("jsonwebtoken");
const path = require("path");
const firebaseConfig = require("../config/firebaseConfig");

const firebsae = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

firebsae.initializeApp(firebaseConfig);

const storage = getStorage();


async function getAllAlumni(req, res) {
  try {
    const alumni = await alumniService.getAllAlumni();
    res.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addAlumni(req, res) {
  try {
    const affectedRows = await alumniService.addAlumni(req.body);
    res.status(201).json({ message: "Alumni added successfully", affectedRows });
  } catch (error) {
    console.error("Error adding alumni:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAlumniProfile(req, res) {
  try {
    const token = req.params.id;
    console.log("Received token:", token);
    const userDetails = await alumniService.GetAlumniDetailsByID(token);
    const user = userDetails[0];
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function alumniSignIn(req, res) {
  try {
    const { username, password } = req.body;
    const authenticationResult = await alumniService.authenticateUser(
      username,
      password
    );

    if (authenticationResult.success) {
      const token = await alumniService.getAlumniID(username);
      const realToken = jwt.sign({ token }, process.env.secretKey, {
        expiresIn: "1w",
      });

      res.status(200).json({
        success: true,
        message: "Authentication successful",
        token,
        realToken,
      });
    } else {
      res.status(401).json({ success: false, message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function adminSignIn(req, res) {
  try {
    const { username, password } = req.body;
    const authenticationResult = await alumniService.authenticateAdmin(
      req,
      username,
      password
    );

    if (authenticationResult.success) {
      const token = await alumniService.getAlumniID(username);
      const realToken = jwt.sign({ token }, process.env.secretKey, {
        expiresIn: "1h",
      });
      res.status(200).json({ success: true, message: "Authentication successful", token, realToken });
    } else {
      res.status(401).json({ success: false, message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function uploadProfilePicture(req, res) {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const alumniID = req.params.id;
    const filePath = `profilePictures/${alumniID}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    const fileRef = ref(storage, filePath);

    try {
      await uploadBytes(fileRef, file.buffer);

      const downloadURL = await getDownloadURL(fileRef);

      const currentProfilePhotoPath =
        await alumniService.getAlumniProfilePhotoById(alumniID);

      if (currentProfilePhotoPath) {
        const currentProfilePhotoRef = ref(storage, currentProfilePhotoPath);
        try {
          await deleteObject(currentProfilePhotoRef);
          console.log("Previous profile photo deleted successfully");
        } catch (deleteError) {
          console.error("Error deleting previous profile photo:", deleteError);
        }
      }

      const updateResult = await alumniService.updateAlumniProfilePhoto(
        alumniID,
        downloadURL
      );

      if (updateResult > 0) {
        console.log("Profile photo updated successfully");
        res.json({ message: "File uploaded successfully" });
      } else {
        console.error("Error updating profile photo in the database");
        res.status(500).json({ error: "Internal server error" });
      }
    } catch (uploadError) {
      console.error("Error uploading new profile photo:", uploadError);
      res.status(500).json({ error: "Internal server error" });
    }
}

async function uploadCoverPicture(req, res) {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const alumniID = req.params.id;
    const filePath = `coverPictures/${alumniID}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    const fileRef = ref(storage, filePath);

    try {
      await uploadBytes(fileRef, file.buffer);

      const downloadURL = await getDownloadURL(fileRef);

      const currentCoverPhotoPath = await alumniService.getAlumniCoverPhotoById(
        alumniID
      );

      if (currentCoverPhotoPath) {
        const currentCoverPhotoRef = ref(storage, currentCoverPhotoPath);
        try {
          await deleteObject(currentCoverPhotoRef);
          console.log("Previous cover photo deleted successfully");
        } catch (deleteError) {
          console.error("Error deleting previous cover photo:", deleteError);
        }
      }

      const updateResult = await alumniService.updateAlumniCoverPhoto(
        alumniID,
        downloadURL
      );

      if (updateResult > 0) {
        console.log("Cover photo updated successfully");
        res.json({ message: "File uploaded successfully" });
      } else {
        console.error("Error updating cover photo in the database");
        res.status(500).json({ error: "Internal server error" });
      }
    } catch (uploadError) {
      console.error("Error uploading new cover photo:", uploadError);
      res.status(500).json({ error: "Internal server error" });
    }
}

async function getProfilePicture(req, res) {
    const idOrUsername = req.params.idOrUsername;

    try {
      let profilePhotoPath;
      if (isNaN(idOrUsername)) {
        const alumni = await alumniService.getAlumniByUsername(idOrUsername);
        profilePhotoPath = alumni ? alumni.profilePhoto : null;
      } else {
        profilePhotoPath = await alumniService.getAlumniProfilePhotoById(
          idOrUsername
        );
      }
  
      if (!profilePhotoPath) {
        return res.status(404).json({ error: "Profile photo not found" });
      }
  
      res.send(profilePhotoPath);
    } catch (error) {
      console.error("Error retrieving profile photo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

async function getCoverPicture(req, res) {
    const idOrUsername = req.params.idOrUsername;

    try {
      let coverPhotoPath;
      if (isNaN(idOrUsername)) {
        const alumni = await alumniService.getAlumniByUsername(idOrUsername);
        coverPhotoPath = alumni ? alumni.coverPhoto : null;
      } else {
        coverPhotoPath = await alumniService.getAlumniCoverPhotoById(
          idOrUsername
        );
      }
  
      if (!coverPhotoPath) {
        return res.status(404).json({ error: "Cover photo not found" });
      }
  
      res.send(coverPhotoPath);
    } catch (error) {
      console.error("Error retrieving cover photo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

async function getAlumniByUsername(req, res) {
    const username = req.params.username;

    try {
      const alumniData = await alumniService.getAlumniData(username);
      res.json(alumniData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
}

async function updateAlumni(req, res) {
    try {
        const alumniID = req.params.id;
        const updateData = req.body;
    
        const affectedRows = await alumniService.updateAlumni(alumniID, updateData);
    
        if (affectedRows > 0) {
          res
            .status(200)
            .json({ message: "Alumni updated successfully", affectedRows });
        } else {
          res.status(500).json({ error: "Failed to update alumni" });
        }
      } catch (error) {
        console.error("Error updating alumni:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

async function checkUsernameAvailability(req, res) {
    try {
        const { username } = req.body;
        const alumniID = req.params.alumniID || null;
    
        const isUsernameTaken = await alumniService.isUsernameTaken(
          username,
          alumniID
        );
    
        res.json({ isUsernameTaken });
      } catch (error) {
        console.error("Error checking username availability:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

async function checkEmailAvailability(req, res) {
    try {
        const { email } = req.body;
        const alumniID = req.params.alumniID || null;
    
        const isEmailTaken = await alumniService.isEmailTaken(email, alumniID);
    
        res.json({ isEmailTaken });
      } catch (error) {
        console.error("Error checking email availability:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

async function checkPassword(req, res) {
    try {
        let { oldPassword } = req.body;
        const alumniID = req.params.alumniID;
    
        const passwordExists = await alumniService.getPassword(
          alumniID,
          oldPassword
        );
    
        res.json({ passwordExists });
      } catch (error) {
        console.error("Error checking password:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

async function changePassword(req, res) {
    try {
        const { newPassword } = req.body;
        const alumniID = req.params.alumniID;
    
        const affectedRows = await alumniService.changePassword(
          alumniID,
          newPassword
        );
    
        if (affectedRows === 0) {
          return res.status(404).json({ error: "Alumni not found" });
        }
    
        res.json({ success: "Password change successful" });
      } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

async function getNotableAlumni(req, res) {
    try {
        const alumniData = await alumniService.getNotable();
        res.json(alumniData);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
}

async function updateNotable(req, res) {
    try {
        const { isNotable } = req.body;
        const alumniID = req.params.alumniID;
    
        const affectedRows = await alumniService.updateNotable(alumniID, isNotable);
    
        if (affectedRows === 0) {
          return res.status(404).json({ error: "Alumni not found" });
        }
    
        res.json({ success: "Notable change successful" });
      } catch (error) {
        console.error("Error changing notable:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

async function resetPassword(req, res) {
    try {
        const { email } = req.body;
    
        const defaultPassword = await alumniService.changepasstodefualt(email);
    
        await alumniService.sendEmail(email, 'Your password has been reset', `Your password has been reset to: ${defaultPassword}. Please login now and change your password.`);
    
        res.status(200).json({ message: 'Password reset email sent successfully.' });
      } catch (error) {
        console.error('Error occurred while resetting password and sending email:', error);
        res.status(500).json({ error: 'An error occurred while resetting password and sending email.' });
      }
}

module.exports = {
  getAllAlumni,
  addAlumni,
  getAlumniProfile,
  alumniSignIn,
  adminSignIn,
  uploadProfilePicture,
  uploadCoverPicture,
  getProfilePicture,
  getCoverPicture,
  getAlumniByUsername,
  updateAlumni,
  checkUsernameAvailability,
  checkEmailAvailability,
  checkPassword,
  changePassword,
  getNotableAlumni,
  updateNotable,
  resetPassword,
};