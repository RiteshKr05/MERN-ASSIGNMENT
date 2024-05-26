// controllers/filterController.js
const User = require('../models/User');

exports.filterEmployeesByLocation = async (req, res) => {
  const location = req.query.location;

  try {
    const employees = await User.find(
      { isManager: false, 'location.city': { $regex: `^${location}`, $options: 'i' } },
      'name email location'
    ).sort('location.city');

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.filterEmployeesByName = async (req, res) => {
  const order = req.query.order === 'asc' ? 1 : -1;

  try {
    const employees = await User.find({ isManager: false }, 'name email').sort({ name: order });

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};