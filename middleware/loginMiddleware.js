const ClientModel  = require('../models/clientModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await ClientModel.findOne({ username });
    if (!user) {
      console.log('User not found for:', username);
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for:', username);
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = user.generateAuthToken();
    const responseNeeded = {
      token: token,
      username: user.username ,
      role: user.role
    };
    res.status(200).json(responseNeeded);
    console.log('username : ', responseNeeded.username);
    console.log('role : ', responseNeeded.role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { login };
