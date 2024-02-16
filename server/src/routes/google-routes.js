const express = require('express');
const authController = require('../controllers/google-controller');
const router = express.Router();

router.get('/auth/google', authController.authenticateGoogle);
router.get('/auth/google/callback', authController.googleCallback);
router.get('/failed', authController.failed);
router.get('/profile', authController.profile);
router.get('/auth/logout', authController.logout);

module.exports = router;