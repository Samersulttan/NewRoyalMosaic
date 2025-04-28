const express = require('express');
const {
  getSectionValidator,
  createSectionValidator,
  updateSectionValidator,
  deleteSectionValidator,
} = require('../utils/validators/sectionValidator');

const {
  getSections,
  getSection,
  createSection,
  updateSection,
  deleteSection,
  uploadSectionImages,
  resizeImages,
} = require('../services/sectionService');

const router = express.Router();

router
  .route('/')
  .get(getSections)
  .post(
    uploadSectionImages,
    resizeImages,
    createSectionValidator,
    createSection
  );

router
  .route('/:id')
  .get(getSectionValidator, getSection)
  .put(
    uploadSectionImages,
    resizeImages,
    updateSectionValidator,
    updateSection
  )
  .delete(deleteSectionValidator, deleteSection);

module.exports = router;