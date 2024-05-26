
const Department = require('../models/Department');
const User = require('../models/User');

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('manager', 'name').populate('employees', 'name');
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createDepartment = async (req, res) => {
  const { name, description, managerEmail } = req.body;

  try {
    const manager = await User.findOne({ email: managerEmail });
    if (!manager) {
      return res.status(400).json({ message: 'Invalid manager email' });
    }

    const newDepartment = new Department({ name, description, manager: manager._id });
    await newDepartment.save();

    res.status(201).json({ message: 'Department created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateDepartment = async (req, res) => {
  const { name, description } = req.body;
  const departmentId = req.params.id;

  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      departmentId,
      { name, description },
      { new: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json(updatedDepartment);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteDepartment = async (req, res) => {
  const departmentId = req.params.id;

  try {
    const deletedDepartment = await Department.findByIdAndDelete(departmentId);

    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};