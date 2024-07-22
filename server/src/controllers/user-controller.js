const alumniService = require("../services/user-services");
const jwt = require("jsonwebtoken");
const path = require("path");
const sharp = require("sharp");
const firebaseConfig = require("../config/firebaseConfig");
require("dotenv").config();

const firebase = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

firebase.initializeApp(firebaseConfig);

const storage = getStorage();

exports.addUser = async function (req, res) {
  try {
    const affectedRows = await alumniService.addUser(req.body);
    res
      .status(201)
      .json({ message: "Alumni added successfully", affectedRows });
  } catch (error) {
    console.error("Error adding alumni:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.signIn = async function (req, res) {
  try {
    const { username, password } = req.body;
    const authenticationResult = await alumniService.authenticateUser(
      username,
      password,
      false
    );

    if (authenticationResult.success) {
      const [token] = await alumniService.getAlumniProfile(username);
      const id2 = token.alumniId;
      const id = token.personId;
      const realToken = jwt.sign({ token }, process.env.secretKey, {
        expiresIn: "30d",
      });


      if (process.env.NODE_ENV === 'dev') {
        res
        .cookie("token", realToken, { httpOnly: true })
        .cookie("id2", id2)
        .cookie("id", id, { httpOnly: false })
      } else if (NODE_ENV === 'prod') {
        res
          .cookie("token", realToken, { httpOnly: true, secure: true })
      }

      res.status(200).json({
        success: true,
        message: "Authentication successful",
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAlumniProfile = async function (req, res) {
  try {
    const token = req.params.id;
    const userDetails = await alumniService.getAlumniProfile(token);
    const user = userDetails;
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllAlumni = async function (req, res) {
  try {
    const alumni = await alumniService.getAllAlumni();
    res.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteAlumni = async function (req, res) {
  try {
    const deleted = await alumniService.deleteAlumni(req.params.id);

    if (deleted) {
      res.status(200).json({ message: "Alumni deleted successfully" });
    } else {
      res.status(404).json({ error: "Alumni not found" });
    }
  } catch (error) {
    console.error("Error deleting alumni:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.uploadProfilePicture = async function (req, res) {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const resizedFile = await sharp(file.buffer).jpeg({ quality: 20 }).toBuffer();

  const alumniId = req.cookies.id2;
  const filePath = `profilePictures/${alumniId}-${Date.now()}${path.extname(
    file.originalname
  )}`;
  const fileRef = ref(storage, filePath);

  try {
    await uploadBytes(fileRef, resizedFile);

    const downloadURL = await getDownloadURL(fileRef);

    const currentProfilePhotoPath =
      await alumniService.getAlumniProfilePhotoById(alumniId);

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
      alumniId,
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
};

exports.uploadCoverPicture = async function (req, res) {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const resizedFile = await sharp(file.buffer).jpeg({ quality: 20 }).toBuffer();

  const alumniId = req.cookies.id2;
  const filePath = `coverPictures/${alumniId}-${Date.now()}${path.extname(
    file.originalname
  )}`;
  const fileRef = ref(storage, filePath);

  try {
    await uploadBytes(fileRef, resizedFile);

    const downloadURL = await getDownloadURL(fileRef);

    const currentCoverPhotoPath = await alumniService.getAlumniCoverPhotoById(
      alumniId
    );

    console.log(currentCoverPhotoPath)

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
      alumniId,
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
};

exports.getProfilePicture = async function (req, res) {
  try {
    const alumni = await alumniService.getAlumniProfile(
      req.params.idOrUsername
    );

    const profilePhotoPath = alumni[0].profilePicture;

    if (!profilePhotoPath) {
      return res.send(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    }

    res.send(profilePhotoPath);
  } catch (error) {
    console.error("Error retrieving profile photo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCoverPicture = async function (req, res) {
  try {
    const alumni = await alumniService.getAlumniProfile(
      req.params.idOrUsername
    );
    const coverPhotoPath = alumni[0].coverPicture;

    if (!coverPhotoPath) {
      return res.send(
        "https://c4.wallpaperflare.com/wallpaper/41/681/303/pc-hd-1080p-nature-1920x1080-wallpaper-preview.jpg"
      );
    }

    res.send(coverPhotoPath);
  } catch (error) {
    console.error("Error retrieving cover photo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateAlumni = async function (req, res) {
  try {
    const affectedRows = await alumniService.updateAlumni(
      req.alumni,
      req.body
    );

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
};

exports.checkUsernameAvailability = async function (req, res) {
  console.log(req.alumni.alumniId)
  try {
    const { username } = req.body;
    const alumniId = req.params.alumniId || null;

    const isUsernameTaken = await alumniService.isUsernameTaken(
      username,
      req.alumni.alumniId
    );

    res.json({ isUsernameTaken });
  } catch (error) {
    console.error("Error checking username availability:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.checkEmailAvailability = async function (req, res) {
  try {
    const { email } = req.body;
    const alumniId = req.alumni.alumniId || null;

    const isEmailTaken = await alumniService.isEmailTaken(email, alumniId);

    res.json({ isEmailTaken });
  } catch (error) {
    console.error("Error checking email availability:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.changePassword = async function (req, res) {
  // : fix it
  try {
    const { newPassword, oldPassword } = req.body;
    const alumniId = req.params.alumniId;

    const affectedRows = await alumniService.changePassword(
      alumniId,
      newPassword,
      oldPassword
    );

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Alumni not found" });
    }

    res.json({ success: "Password change successful" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getNotableAlumni = async function (req, res) {
  try {
    const alumniData = await alumniService.getNotable();
    res.json(alumniData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateNotable = async function (req, res) {
  try {
    const { isNotable } = req.body;
    const alumniId = req.params.alumniId;

    const affectedRows = await alumniService.updateNotable(alumniId, isNotable);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Alumni not found" });
    }

    res.json({ success: "Notable change successful" });
  } catch (error) {
    console.error("Error changing notable:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.resetPassword = async function (req, res) {
  // problem what if the user that is requesting not really the account owner? will it be changed to defualt. I will fix this, not today
  try {
    const { email } = req.body;

    const confirmationToken = await alumniService.sendConfirmation(email);

    await alumniService.sendEmail(
      email,
      "password reset request accepted!",
      `Your confirmation code is: ${confirmationToken}`
    );

    res
      .status(200)
      .json({ message: "Password reset email sent successfully." });
  } catch (error) {
    console.error(
      "Error occurred while resetting password and sending email:",
      error
    );
    res.status(500).json({
      error: "An error occurred while resetting password and sending email.",
    });
  }
};

exports.confirmPasswordChange = async function (req, res) {
  const { email, confirmationToken, newPassword } = req.body;

  try {
    const result = await alumniService.confirmPasswordChange(
      email,
      confirmationToken,
      newPassword
    );
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error("Error confirming password change:", error);
    res
      .status(500)
      .json({ error: "An error occurred while confirming password change" });
  }
};

exports.updateCustomSetting = async function (req, res) {
  const { phoneNumber, recieveNewsLetter } = req.body; // Corrected variable name
  try {
    const result = await alumniService.updateCustom(req.params.alumniId, {
      phoneNumber,
      recieveNewsLetter,
    });
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ error: "Failed to update custom settings." });
    }
  } catch (error) {
    console.error("Error updating custom setting:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating custom setting" });
  }
};

exports.searchAlumni = async function (req, res) {
  try {
    let { searchBy, searchByValue } = req.body;
    if (searchBy === "name" || searchBy === "department" || searchBy === "degree" || searchBy === "industry" || searchBy === "location") {
      searchByValue = `%${searchByValue}%`;
    }
    const alumni = await alumniService.getAlumniDirectory(
      searchBy,
      searchByValue
    );
    res.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
