// backend/config/db.js
const { Sequelize } = require('sequelize');

// Update 'root' and '' with your real local MySQL username and password
const sequelize = new Sequelize('campuseco_db', 'root', '9847', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false 
});

module.exports = sequelize; // Export the database instance directly