// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

const logger = require('./middleware/logger')
const products = require('./routes/products')
const login = require('./routes/login')

app.use(logger)
app.use('/api/products', products )
app.use('/', login)


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000...`);
});

// Export the app for testing purposes
module.exports = app; 