const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donation-controller");

router.post("/donation", donationController.createDonation);
router.get("/donation", donationController.getAllDonation);
router.get("/donation/:id", donationController.getDonationById);
router.delete("/donation/:id", donationController.deleteDonation);
router.put("/donation/:id", donationController.updateDonation);

module.exports = router;