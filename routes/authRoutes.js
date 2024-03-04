const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/auth', authController.toAuthenticate);

module.exports = router;
