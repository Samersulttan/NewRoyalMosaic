const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid product id format'),
  validatorMiddleware,
];

exports.createProductValidator = [
  check('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 3 })
    .withMessage('Too short product name')
    .isLength({ max: 100 })
    .withMessage('Too long product name'),
  check('description')
    .notEmpty()
    .withMessage('Product description is required'),
  check('category')
    .notEmpty()
    .withMessage('Product must belong to a category')
    .isMongoId()
    .withMessage('Invalid category id format'),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check('id').isMongoId().withMessage('Invalid product id format'),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid product id format'),
  validatorMiddleware,
];