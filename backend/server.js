// backend/server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); // Import connection from config/db
const listingRoutes = require('./routes/listingRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Verify Database connection and build tables
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to MySQL DBMS successfully!');
    return sequelize.sync(); 
  })
  .then(() => console.log('📂 MySQL Tables Created/Synced!'))
  .catch(err => console.error('❌ MySQL Connection Error:', err.message));

app.use('/api/listings', listingRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});