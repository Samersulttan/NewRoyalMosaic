const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getDepartmentValidator = [
  check('id').isMongoId().withMessage('Invalid department id format'),
  validatorMiddleware,
];

exports.createDepartmentValidator = [
  check('title')
    .notEmpty()
    .withMessage('Department title is required')
    .isLength({ min: 3 })
    .withMessage('Too short department title')
    .isLength({ max: 32 })
    .withMessage('Too long department title'),
  check('subtitle')
    .notEmpty()
    .withMessage('Department subtitle is required'),
  check('description')
    .notEmpty()
    .withMessage('Department description is required'),
  check('path')
    .notEmpty()
    .withMessage('Department path is required'),
  validatorMiddleware,
];

exports.updateDepartmentValidator = [
  check('id').isMongoId().withMessage('Invalid department id format'),
  validatorMiddleware,
];

exports.deleteDepartmentValidator = [
  check('id').isMongoId().withMessage('Invalid department id format'),
  validatorMiddleware,
];