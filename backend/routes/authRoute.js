const express = require('express');
const { login } = require('../services/authService');
const { loginValidator } = require('../utils/validators/authValidator');

const router = express.Router();

router.post('/login', loginValidator, login);

module.exports = router;