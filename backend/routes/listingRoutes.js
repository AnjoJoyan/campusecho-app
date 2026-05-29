// backend/routes/listingRoutes.js
const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');

// Check these names! listingController.getAllListings must match the controller
router.get('/', listingController.getAllListings);
router.post('/', listingController.createListing);

module.exports = router;