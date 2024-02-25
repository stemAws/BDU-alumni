const db = require('../config/db');

const createDonation = async function (title, link, description) {
  try {
    const [result] = await db.query(
      "INSERT INTO donation (title, link, description) VALUES (?, ?, ?)",
      [title, link, description]
    );

    return result.insertId;
  } catch (error) {
    console.error("Error creating donation:", error);
    throw error;
  }
};

const updateDonation = async function (id, updateDonation) {
  const { title, link, description } = updateDonation;

  const [result] = await db.query(
    `
    UPDATE donation
    SET title = ?, link = ?, description = ?
    WHERE id = ?
  `,
    [title, link, description, id]
  );

  return result.affectedRows;
};

const getDonationById = async function (id) {
  try {
    const [rows] = await db.query("SELECT * FROM donation WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      throw new Error("Donation not found");
    }

    return rows;
  } catch (error) {
    console.error("Error getting donation by id:", error);
    throw error;
  }
};

const getAllDonation = async function () {
  try {
    const [donation] = await db.query("SELECT * FROM donation");

    return donation;
  } catch (error) {
    console.error("Error fetching donation:", error);
    throw new Error("Failed to fetch donation");
  }
};

const deleteDonation = async function (id) {
  try {
    const [result] = await db.query("DELETE FROM donation WHERE id = ?", [
      id,
    ]);

    return result.affectedRows;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};


module.exports = {
  createDonation,
  getDonationById,
  getAllDonation,
  updateDonation,
  deleteDonation
};