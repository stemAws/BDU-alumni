const db = require("../config/db");

exports.createGallery = async ({ images, event, year, department, description}) => {
  try {
    const [result] = await db.query(
      "INSERT INTO Gallery (media, title, year, department, description) VALUES (?,?,?, ?, ?)",
      [JSON.stringify(images), event, year, department, description]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
};

exports.getGalleryById = async (gID) => {
  try {
    const result = await db.query("SELECT * FROM Gallery WHERE galleryID = ?", [
      gID,
    ]);
    return result[0][0];
  } catch (error) {
    throw error;
  }
};

exports.getAllGallery = async () => {
  try {
    const [result] = await db.query("SELECT * FROM Gallery");
    return result;
  } catch (error) {
    throw error;
  }
};

exports.deleteGallery = async (galleryID) => {
  try {
    const [result] = await db.query("DELETE FROM Gallery WHERE galleryID = ?", [
      galleryID,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

exports.updateGallery = async (galleryID, updatedGallery) => {
  const { event, year, department, description } = updatedGallery;

  try {
    const [result] = await db.query(
      "UPDATE Gallery SET title = ?, year = ? , department = ?,  description = ? WHERE galleryID = ?",
      [event, year, department, description, galleryID]
    );
    return result.affectedRows;
  } catch (error) {
    console.error("Error updating gallery in service:", error);
    throw error;
  }
};
