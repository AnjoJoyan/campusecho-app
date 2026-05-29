// backend/models/Listing.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // CHANGE THIS LINE to point to config/db

const Listing = sequelize.define('Listing', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true 
});

module.exports = Listing;