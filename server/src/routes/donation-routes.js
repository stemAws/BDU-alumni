const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donation-controller");
const {
  verifyToken,
  authRoles,
  verifyRefreshToken,
} = require("../middleware/auth-middleware");
const { admin } = require("../utils/roles");

router.post(
  "/donation",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  donationController.createDonation
);
router.get("/donation", donationController.getAllDonation);
router.get(
  "/donation/:id",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  donationController.getDonationById
);
router.delete(
  "/donation/:id",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  donationController.deleteDonation
);
router.put(
  "/donation/:id",
  verifyToken,
  verifyRefreshToken,
  authRoles(admin),
  donationController.updateDonation
);

module.exports = router;
