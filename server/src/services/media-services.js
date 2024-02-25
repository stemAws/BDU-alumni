<<<<<<< HEAD
const db = require("../config/db");
=======
const db = require('../config/db');
>>>>>>> d0257d685b34a4d7e75c639c4327d16ddee7a0a5

exports.createGallery = async ({ images, event, year }) => {
  try {
    const [result] = await db.query(
      "INSERT INTO gallery (images, event, year) VALUES (?, ?, ?)",
      [JSON.stringify(images), event, year]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
};

exports.getGalleryById = async (gID) => {
  try {
    const result = await db.query("SELECT * FROM gallery WHERE galleryID = ?", [
      gID,
    ]);
    return result[0][0];
  } catch (error) {
    throw error;
  }
};

exports.getAllGallery = async () => {
  try {
    const [result] = await db.query("SELECT * FROM gallery");
    return result;
  } catch (error) {
    throw error;
  }
};

exports.deleteGallery = async (galleryID) => {
  try {
    const [result] = await db.query("DELETE FROM gallery WHERE galleryID = ?", [
      galleryID,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

exports.updateGallery = async (galleryID, updatedGallery) => {
  const {
    event,
    year,
    } = updatedGallery;

  try {
    const [result] = await db.query("UPDATE gallery SET event = ?, year = ? WHERE galleryID = ?", [event, year, galleryID]
    );
    return result.affectedRows;
  } catch (error) {
    console.error("Error updating gallery in service:", error);
    throw error;
  }
};