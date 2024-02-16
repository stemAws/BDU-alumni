const donationService = require("../services/donation-services");

exports.createDonation = async (req, res) => {
  const { title, link, description } = req.body;

  try {
    const donationID = await donationService.createDonation(title, link, description);

    res.json({ donationID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllDonation = async (req, res) => {
  try {
    const donation = await donationService.getAllDonation();
    res.send(donation);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDonationById = async (req, res) => {
  const id = req.params.id;
  try {
    const donation = await donationService.getDonationById(id);

    if (!donation) {
      res
        .status(404)
        .json({ error: "No record found for the given ID" });
    } else {
      res.send(donation);
    }
  } catch (error) {
    console.error("Error fetching donation by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await donationService.deleteDonation(id);

    if (affectedRows === 0) {
      res.status(404).json(`No record with the given id: ${id}`);
    } else {
      res.json({ message: "Donation deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting donation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDonationData = req.body;

    const affectedRows = await donationService.updateDonation(id, updatedDonationData);

    if (affectedRows === 0) {
      res.status(404).json(`No record with the given id: ${id}`);
    } else {
      res.json({ message: "Donation updated successfully" });
    }
  } catch (error) {
    console.error("Error updating donation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};