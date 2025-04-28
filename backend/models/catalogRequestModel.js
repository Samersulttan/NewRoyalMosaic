const mongoose = require('mongoose');

const catalogRequestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

const CatalogRequest = mongoose.model('CatalogRequest', catalogRequestSchema);

module.exports = CatalogRequest;