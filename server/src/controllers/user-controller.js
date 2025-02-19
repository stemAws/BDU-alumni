const alumniService = require("../services/user-services");
const adminService = require("../services/admin-services");
const jwt = require("jsonwebtoken");
const path = require("path");
const sharp = require("sharp");
const bcrypt = require("bcrypt");
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

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const userExists = await alumniService.isUserExists(username);
    if (!userExists) {
      return res
        .status(400)
        .json({ ok: false, success: false, message: "User doesn't exist" });
    }

    // Check if the account is active
    const userActive = await alumniService.isUserActive(username);
    if (!userActive) {
      const inactiveUser = await alumniService.getUser(username);

      return res.status(400).json({
        ok: false,
        success: false,
        message: "Account is not activated.",
        userId: inactiveUser[0].personId,
      });
    }

    // Get the user's details
    const user = await alumniService.getUser(username);

    const userData = user[0];

    // Verify the hashed password
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        ok: false,
        success: false,
        message: "Invalid password",
      });
    }

    // Determine user role
    const adminDetails =
      userData.isAdmin === 1 &&
      (await adminService.fetchAdminDetailsByPersonId(userData.personId));

    const role = userData.isAdmin ? adminDetails.role : "alumni";
    const id = userData.personId;

    // Generate access and refresh tokens
    const accessToken = jwt.sign(
      { id: String(id), role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRES, // Short-lived access token
      }
    );
    const refreshToken = jwt.sign(
      { id: String(id), role },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES, // Longer-lived refresh token
      }
    );
    // Set tokens in cookies
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      ok: true,
      success: true,
      message: "User logged in successfully",
      userId: user[0].personId,
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).json({
      ok: false,
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token; // Access the token from the cookie

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
    // Verify the token (e.g., using jwt.verify)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }
      // Return successful authentication with role information
      res
        .status(200)
        .json({ success: true, role: decoded.role, id: decoded.id });
    });
  } catch (err) {
    console.error("Error verifying authentication:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    // Clear both access and refresh tokens
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Set maxAge to 0 to expire the cookie immediately
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Set maxAge to 0 to expire the cookie immediately
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Error during logout:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.checkUser = async (req, res) => {
  try {
    const { oldUsername, oldPassword } = req.body;
    // Check if user exists
    const userExists = await alumniService.isUserExists(oldUsername);
    if (!userExists) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    // gets user by old username and password
    const user = await alumniService.getUser(oldUsername);
    if (!user || user.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const userData = user[0]; // Assuming the query returns an array of rows

    // Verify the hashed password
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      userData.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({
      message: "User checked successfully",
      userId: userData.personId,
    });
  } catch (err) {
    console.error("Error checking user:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
exports.activateAccount = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { userId } = req.params;

    const activate = await alumniService.activateUser(userId, newPassword);

    if (!activate.success) {
      return res.status(400).json({ message: activate.message });
    }

    res.status(200).json({
      message: "User activated successfully",
      userId,
    });
  } catch (err) {
    console.error("Error activating user:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.addUser = async function (req, res) {
  try {
    const affectedRows = await alumniService.addUser(req.body);
    res
      .status(201)
      .json({ message: "Alumni added successfully", affectedRows });
  } catch (error) {
    console.error("Error adding alumni:", error.message);
    res.status(400).json({ error: error.message }); // Send error message in response
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

    console.log(currentCoverPhotoPath);

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
    console.log("id from controller", req.params.userId);
    const alumni = await alumniService.getAlumniProfile(req.params.userId);

    console.log("profile picture from controller: ", alumni);

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
    const affectedRows = await alumniService.updateAlumni(req.alumni, req.body);

    if (affectedRows) {
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
  try {
    const { username } = req.body;

    const isUsernameTaken = await alumniService.isUsernameTaken(
      username,
      req.alumni.personId
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

    const isEmailTaken = await alumniService.isEmailTaken(
      email,
      req.alumni.personId
    );

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
    let { name, searchBy, searchByValue } = req.body;

    // Ensure name is always provided
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Add wildcard for partial matching
    name = `%${name}%`;
    if (searchBy && searchByValue) {
      searchByValue = `%${searchByValue}%`;
    }

    // Call service function with the provided values
    const alumni = await alumniService.getAlumniDirectory(
      name,
      searchBy,
      searchByValue
    );

    res.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.reserveTranscriptPlace = async function (req, res) {
  try {
    const alumniId = req.alumni.alumniId;

    const result = await alumniService.reserveTranscriptPlace(alumniId);

    if (result) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to reserve place" });
    }
  } catch (error) {
    console.error("Error reserving place:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.fakeresetpass = async function (req, res) {
  await alumniService.fakereset(req.body);
  res.json("done");
};
