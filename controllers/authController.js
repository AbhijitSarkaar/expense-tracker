const User = require('../models/User');
const jwt = require('jsonwebtoken');

//generate jwt token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const register = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;
  if (!email || !password || !fullName) {
    return res.status(400).json({
      message: 'fields are missing',
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email already in use',
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error registering user',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'email / password missing',
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'User does not exist',
      });
    }

    const isPasswordMatch = await user.comparePassword(password);
    console.log('isPasswordMatch', isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'Incorrect password',
      });
    }

    return res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: 'login error',
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {};

module.exports = {
  register,
  login,
  getUser,
};
