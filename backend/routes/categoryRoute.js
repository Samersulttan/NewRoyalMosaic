const express = require('express');
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeCategoryImage,
} = require('../services/categoryService');

const router = express.Router();

router
  .route('/')
  .get(getCategories)
  .post(
    uploadCategoryImage,
    resizeCategoryImage,
    createCategoryValidator,
    createCategory
  );

router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(
    uploadCategoryImage,
    resizeCategoryImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;