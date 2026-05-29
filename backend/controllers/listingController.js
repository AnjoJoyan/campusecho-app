const Listing = require('../models/Listing');

// GET all listings from SQL DBMS
exports.getAllListings = async (req, res) => {
    try {
        const listings = await Listing.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching from SQL DBMS", error: error.message });
    }
};

// POST a new listing to SQL DBMS
exports.createListing = async (req, res) => {
    try {
        const newListing = await Listing.create({
            title: req.body.title,
            price: req.body.price,
            category: req.body.category
        });
        res.status(201).json(newListing);
    } catch (error) {
        res.status(400).json({ message: "Error saving to SQL DBMS", error: error.message });
    }
};