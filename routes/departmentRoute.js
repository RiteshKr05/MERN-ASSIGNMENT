// routes/departments.js
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middleware/auth');
const isManagerMiddleware = require('../middleware/isManager');

// Get all departments (only for managers)
router.get('/', authMiddleware, isManagerMiddleware, departmentController.getAllDepartments);

// Create a new department (only for managers)
router.post('/', authMiddleware, isManagerMiddleware, departmentController.createDepartment);

// Update a department (only for managers)
router.put('/:id', authMiddleware, isManagerMiddleware, departmentController.updateDepartment);

// Delete a department (only for managers)
router.delete('/:id', authMiddleware, isManagerMiddleware, departmentController.deleteDepartment);

module.exports = router;