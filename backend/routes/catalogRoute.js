const express = require('express');
const { 
  createCatalogRequest,
  getCatalogRequests 
} = require('../services/catalogService');
const { catalogRequestValidator } = require('../utils/validators/catalogValidator');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getCatalogRequests)
  .post(catalogRequestValidator, createCatalogRequest);

module.exports = router;