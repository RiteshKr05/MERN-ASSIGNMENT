// routes/employees.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/auth');
const isManagerMiddleware = require('../middleware/isManager');

// Get all employees (for managers) or a single employee (for employees)
router.get('/', authMiddleware, employeeController.getAllEmployees);

// Create a new employee (only for managers)
router.post('/', authMiddleware, isManagerMiddleware, employeeController.createEmployee);

// Update an employee (only for managers or the employee themselves)
router.put('/:id', authMiddleware, employeeController.updateEmployee);

// Delete an employee (only for managers)
router.delete('/:id', authMiddleware, isManagerMiddleware, employeeController.deleteEmployee);

module.exports = router;