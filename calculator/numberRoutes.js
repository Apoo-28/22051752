const express = require('express');
const { handleNumberRequest } = require('../services/numberService');

const router = express.Router();

// Route for handling requests to /numbers/:numberid
router.get('/:numberid', handleNumberRequest);

module.exports = router;
