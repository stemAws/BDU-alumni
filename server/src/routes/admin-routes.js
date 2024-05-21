const express = require('express');
const adminController = require('../controllers/admin-controller');
const multer = require('multer');
const { verifyToken } = require('../middleware/auth-middleware');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/uploadAlumniData', upload.single('file'), adminController.uploadAlumniData);
router.get('/suggestedtoadmin', adminController.getSuggestedToAdmin);
router.put('/updatepost/:postID', adminController.updatePost);
router.get('/suggestedByAdmin', adminController.getSuggestedByAdmin);
router.get('/geoData', verifyToken, adminController.getGeoData);
router.get('/userDataByCountry', adminController.getUserDataByCountry);
router.post('/addDonation', adminController.addDonation);
router.get('/getDonations', adminController.getDonations);
router.get('/getAlumni', adminController.getAlumni);
module.exports = router;