// controllers/employeeController.js
const bcrypt = require('bcrypt');
const Employee = require('../models/User');

exports.getAllEmployees = async (req, res) => {
  try {
    if (req.user.isManager) {
      const employees = await Employee.find({ isManager: false }, 'name email');
      res.status(200).json(employees);
    } else {
      const employee = await Employee.findById(req.user.userId, 'name email');
      res.status(200).json(employee);
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createEmployee = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEmployee = new Employee({ name, email, password: hashedPassword });
    await newEmployee.save();

    res.status(201).json({ message: 'Employee created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const { name, email } = req.body;

  try {
    if (req.user.isManager || req.user.userId === employeeId) {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        { name, email },
        { new: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      res.status(200).json(updatedEmployee);
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};