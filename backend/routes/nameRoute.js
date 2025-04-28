const express = require('express');
const {
  createName,
  getNames
} = require('../services/nameService');

const router = express.Router();

router.route('/')
  .get(getNames)
  .post(createName);

module.exports = router;