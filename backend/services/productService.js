const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/productModel');
const factory = require('./handlersFactory');
const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');

exports.uploadProductImages = uploadMixOfImages([
  { name: 'images', maxCount: 8 }
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  if (!req.files.images) return next();

  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, idx) => {
      const filename = `product-${uuidv4()}-${Date.now()}-${idx + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/products/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

exports.getProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);