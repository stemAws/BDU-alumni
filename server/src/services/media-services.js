// Import the database module
const db = require("../db");

// Create a new gallery entry in the gallery table
const createGallery = async ({ images, event, year }) => {
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

// Retrieve a gallery entry by galleryID from the gallery table
const getGalleryById = async (gID) => {
  try {
    const result = await db.query("SELECT * FROM gallery WHERE galleryID = ?", [
      gID,
    ]);
    return result[0];
  } catch (error) {
    throw error;
  }
};

// Retrieve all gallery entries from the gallery table
const getAllGallery = async () => {
  try {
    const [result] = await db.query("SELECT * FROM gallery");
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete a gallery entry by galleryID from the gallery table
const deleteGallery = async (galleryID) => {
  try {
    const [result] = await db.query("DELETE FROM gallery WHERE galleryID = ?", [
      galleryID,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Update a gallery entry by galleryID in the gallery table
const updateGallery = async (galleryID, updatedGallery) => {
  const {
    event,
    year,
    // , images
  } = updatedGallery;

  try {
    const [result] = await db.query(
      `
      UPDATE gallery
      SET
        event = ?,
        year = ?
      WHERE
        galleryID = ?
    `,
      [
        // JSON.stringify(images),
        event,
        year,
        galleryID,
      ]
    );
    return result.affectedRows;
  } catch (error) {
    console.error("Error updating gallery in service:", error);
    throw error;
  }
};

// Delete a specific image from the images array in the gallery table
// const deleteGalleryImage = async (galleryID, imageIndex) => {
//   try {
//     const [result] = await db.query(
//       "UPDATE gallery SET images = JSON_REMOVE(images, ?) WHERE galleryID = ?",
//       [imageIndex, galleryID]
//     );
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };


// Export the functions
module.exports = {
  createGallery,
  getAllGallery,
  getGalleryById,
  deleteGallery,
  updateGallery,
  // deleteGalleryImage
};