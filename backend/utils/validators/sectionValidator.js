const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getSectionValidator = [
  check('id').isMongoId().withMessage('Invalid section id format'),
  validatorMiddleware,
];

exports.createSectionValidator = [
  check('name')
    .notEmpty()
    .withMessage('Section name is required')
    .isLength({ min: 3 })
    .withMessage('Too short section name')
    .isLength({ max: 32 })
    .withMessage('Too long section name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('description')
    .notEmpty()
    .withMessage('Section description is required'),
  validatorMiddleware,
];

exports.updateSectionValidator = [
  check('id').isMongoId().withMessage('Invalid section id format'),
  body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteSectionValidator = [
  check('id').isMongoId().withMessage('Invalid section id format'),
  validatorMiddleware,
];