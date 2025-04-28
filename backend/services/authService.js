const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const User = require('../models/userModel');

const createToken = async(id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  console.log("======================================");

  console.log(username, password);

  // 1) Check if username and password exist
  if (!username || !password) {
    return next(new ApiError('Please provide username and password', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ username });
  console.log("================2======================");

  console.log(user);

  if (!user ) {
    return next(new ApiError('Incorrect username or password', 401));
  }

  // 3) If everything ok, send token to client
  const token = await createToken(user._id);
  console.log("================2======================");

  console.log(token);

  res.status(200).json({
    status: 'success',
    token,
  });
});