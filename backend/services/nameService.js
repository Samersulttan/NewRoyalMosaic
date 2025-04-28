const asyncHandler = require('express-async-handler');
const Name = require('../models/nameModel');

// @desc    Create new name
// @route   POST /api/v1/names
// @access  Public
exports.createName = asyncHandler(async (req, res) => {
  const name = await Name.create(req.body);
  res.status(201).json({
    status: 'success',
    data: name
  });
});

// @desc    Get all names
// @route   GET /api/v1/names
// @access  Public
exports.getNames = asyncHandler(async (req, res) => {
  const names = await Name.find();
  res.status(200).json({
    status: 'success',
    results: names.length,
    data: names
  });
});