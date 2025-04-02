const express = require('express');
const numberRoutes = require('./routes/numberRoutes');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use the numberRoutes for handling API requests
app.use('/numbers', numberRoutes);

module.exports = app;
