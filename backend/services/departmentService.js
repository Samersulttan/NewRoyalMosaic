const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const Department = require('../models/departmentModel');
const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

exports.uploadDepartmentImage = uploadSingleImage('image');

exports.resizeDepartmentImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const filename = `department-${uuidv4()}-${Date.now()}.jpeg`;

  // Process image while maintaining aspect ratio
  await sharp(req.file.buffer)
    .resize({
      width: 2000, // Set max width
      height: 1333, // Set max height
      fit: 'cover', // Maintain aspect ratio and cover the dimensions
      position: 'center', // Center the image
    })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/departments/${filename}`);

  req.body.image = filename;
  next();
});

exports.getDepartments = factory.getAll(Department);
exports.getDepartment = factory.getOne(Department);
exports.createDepartment = factory.createOne(Department);
exports.updateDepartment = factory.updateOne(Department);
exports.deleteDepartment = factory.deleteOne(Department);
