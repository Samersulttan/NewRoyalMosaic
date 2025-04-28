const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Section name is required'],
      unique: [true, 'Section name must be unique'],
      minlength: [3, 'Too short section name'],
      maxlength: [32, 'Too long section name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Section description is required'],
    },
    coverImage: {
      type: String,
      required: [true, 'Section cover image is required'],
    },
    galleryImages: [{
      type: String,
      required: [true, 'Gallery images are required'],
    }],
    sliderImages: [{
      type: String,
      required: [true, 'Slider images are required'],
    }],
  },
  { timestamps: true }
);

// Set image URLs
const setImageURL = (doc) => {
  if (doc.coverImage) {
    doc.coverImage = `${process.env.BASE_URL}/sections/${doc.coverImage}`;
  }
  if (doc.galleryImages) {
    doc.galleryImages = doc.galleryImages.map(
      img => `${process.env.BASE_URL}/sections/${img}`
    );
  }
  if (doc.sliderImages) {
    doc.sliderImages = doc.sliderImages.map(
      img => `${process.env.BASE_URL}/sections/${img}`
    );
  }
};

sectionSchema.post('init', (doc) => {
  setImageURL(doc);
});

sectionSchema.post('save', (doc) => {
  setImageURL(doc);
});

const SectionModel = mongoose.model('Section', sectionSchema);

module.exports = SectionModel;