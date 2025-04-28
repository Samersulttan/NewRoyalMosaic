const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: [true, 'Category name must be unique'],
      minlength: [3, 'Too short category name'],
      maxlength: [32, 'Too long category name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Category description is required'],
    },
    mainImage: {
      type: String,
      required: [true, 'Category main image is required'],
    },
    department: {
      type: mongoose.Schema.ObjectId,
      ref: 'Department',
      required: [true, 'Category must belong to a department'],
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for products
categorySchema.virtual('products', {
  ref: 'Product',
  foreignField: 'category',
  localField: '_id'
});

// Document middleware: runs before .save() and .create()
categorySchema.pre('save', function(next) {
  this.slug = slugify(this.name);
  next();
});

// Set image URL
categorySchema.post('init', (doc) => {
  if (doc.mainImage) {
    doc.mainImage = `${process.env.BASE_URL}/categories/${doc.mainImage}`;
  }
});

categorySchema.post('save', (doc) => {
  if (doc.mainImage) {
    doc.mainImage = `${process.env.BASE_URL}/categories/${doc.mainImage}`;
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;