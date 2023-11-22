const ClientModel = require('../models/clientModel');
const driverModel = require('../models/driverModel');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await ClientModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    let newUser;
    if (!role) {
      newUser = new ClientModel({ username, password });
    } else {
      newUser = new ClientModel({ username, password, role });
      const savedUser = await newUser.save();
      if (role === 'driver') {
        const newDriver = new driverModel({ username, id: savedUser.id });
        await newDriver.save();
      }
    }

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { register };
