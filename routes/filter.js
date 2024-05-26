const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filterController');
const authMiddleware = require('../middleware/auth');

// Filter employees by location
router.get('/location', authMiddleware, filterController.filterEmployeesByLocation);

// Filter employees by name (ascending or descending)
router.get('/name', authMiddleware, filterController.filterEmployeesByName);

module.exports = router;