const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donation-controller");
const { verifyToken, authRoles } = require("../middleware/auth-middleware");
const { admin } = require("../utils/roles");

router.post(
  "/donation",
  verifyToken,
  authRoles(admin),
  donationController.createDonation
);
router.get("/donation", donationController.getAllDonation);
router.get(
  "/donation/:id",
  verifyToken,
  authRoles(admin),
  donationController.getDonationById
);
router.delete("/donation/:id", donationController.deleteDonation);
router.put(
  "/donation/:id",
  verifyToken,
  authRoles(admin),
  donationController.updateDonation
);

module.exports = router;
