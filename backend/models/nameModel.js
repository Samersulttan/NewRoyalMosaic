const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    }
  },
  { timestamps: true }
);

const Name = mongoose.model('Name', nameSchema);

module.exports = Name;