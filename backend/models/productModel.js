const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      unique: [true, 'Product name must be unique'],
      minlength: [3, 'Too short product name'],
      maxlength: [100, 'Too long product name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    images: [{
      type: String,
      required: [true, 'Product images are required'],
    }],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category'],
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Document middleware: runs before .save() and .create()
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name);
  next();
});

// Set images URLs
productSchema.post('init', (doc) => {
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => {
      imagesList.push(`${process.env.BASE_URL}/products/${image}`);
    });
    doc.images = imagesList;
  }
});

productSchema.post('save', (doc) => {
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => {
      imagesList.push(`${process.env.BASE_URL}/products/${image}`);
    });
    doc.images = imagesList;
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;