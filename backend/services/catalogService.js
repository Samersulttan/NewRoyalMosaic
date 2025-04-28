const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');
const CatalogRequest = require('../models/catalogRequestModel');
const ApiError = require('../utils/apiError');

exports.createCatalogRequest = asyncHandler(async (req, res, next) => {
  const { email, fullName, phoneNumber, address } = req.body;

  // Create catalog request record
  const catalogRequest = await CatalogRequest.create({
    email,
    fullName,
    phoneNumber,
    address
  });

  // Check if catalog file exists
  const catalogPath = path.join(__dirname, '../uploads/catalog/catalog.pdf');
  if (!fs.existsSync(catalogPath)) {
    return next(new ApiError('Catalog file not found', 404));
  }

  // Set response headers for PDF download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=catalog.pdf');

  // Stream the file to the client
  const fileStream = fs.createReadStream(catalogPath);
  fileStream.pipe(res);

  // Handle stream errors
  fileStream.on('error', (error) => {
    console.error('Error streaming catalog file:', error);
    if (!res.headersSent) {
      next(new ApiError('Error downloading catalog', 500));
    }
  });
});

exports.getCatalogRequests = asyncHandler(async (req, res) => {
  const catalogRequests = await CatalogRequest.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    data: catalogRequests
  });
});