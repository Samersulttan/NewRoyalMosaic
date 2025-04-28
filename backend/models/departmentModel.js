const mongoose = require('mongoose');
const slugify = require('slugify');

const departmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Department title is required'],
      unique: [true, 'Department title must be unique'],
      minlength: [3, 'Too short department title'],
      maxlength: [32, 'Too long department title'],
    },
    subtitle: {
      type: String,
      required: [true, 'Department subtitle is required'],
    },
    description: {
      type: String,
      required: [true, 'Department description is required'],
    },
    path: {
      type: String,
      required: [true, 'Department path is required'],
      unique: [true, 'Department path must be unique'],
    },
    image: {
      type: String,
      required: [true, 'Department image is required'],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Document middleware: runs before .save() and .create()
departmentSchema.pre('save', function(next) {
  // Create slug from title
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Set image URL
departmentSchema.post('init', (doc) => {
  if (doc.image) {
    doc.image = `${process.env.BASE_URL}/departments/${doc.image}`;
  }
});

departmentSchema.post('save', (doc) => {
  if (doc.image) {
    doc.image = `${process.env.BASE_URL}/departments/${doc.image}`;
  }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;