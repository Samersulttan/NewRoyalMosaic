const express = require('express');
const {
  getDepartmentValidator,
  createDepartmentValidator,
  updateDepartmentValidator,
  deleteDepartmentValidator,
} = require('../utils/validators/departmentValidator');

const {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  uploadDepartmentImage,
  resizeDepartmentImage,
} = require('../services/departmentService');

const router = express.Router();

router
  .route('/')
  .get(getDepartments)
  .post(
    uploadDepartmentImage,
    resizeDepartmentImage,
    createDepartmentValidator,
    createDepartment
  );

router
  .route('/:id')
  .get(getDepartmentValidator, getDepartment)
  .put(
    uploadDepartmentImage,
    resizeDepartmentImage,
    updateDepartmentValidator,
    updateDepartment
  )
  .delete(deleteDepartmentValidator, deleteDepartment);

module.exports = router;
