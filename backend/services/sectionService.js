const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const factory = require('./handlersFactory');
const Section = require('../models/sectionModel');
const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');

exports.uploadSectionImages = uploadMixOfImages([
  { name: 'coverImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 8 },
  { name: 'sliderImages', maxCount: 8 },
]);

exports.resizeImages = asyncHandler(async (req, res, next) => {
  if (req.files.coverImage) {
    const coverImageFilename = `section-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.coverImage[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/sections/${coverImageFilename}`);
    req.body.coverImage = coverImageFilename;
  }

  if (req.files.galleryImages) {
    req.body.galleryImages = [];
    await Promise.all(
      req.files.galleryImages.map(async (img, idx) => {
        const filename = `section-${uuidv4()}-${Date.now()}-gallery-${idx + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`uploads/sections/${filename}`);
        req.body.galleryImages.push(filename);
      })
    );
  }

  if (req.files.sliderImages) {
    req.body.sliderImages = [];
    await Promise.all(
      req.files.sliderImages.map(async (img, idx) => {
        const filename = `section-${uuidv4()}-${Date.now()}-slider-${idx + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`uploads/sections/${filename}`);
        req.body.sliderImages.push(filename);
      })
    );
  }

  next();
});

exports.getSections = factory.getAll(Section);
exports.getSection = factory.getOne(Section);
exports.createSection = factory.createOne(Section);
exports.updateSection = factory.updateOne(Section);
exports.deleteSection = factory.deleteOne(Section);