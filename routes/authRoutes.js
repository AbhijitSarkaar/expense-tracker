const express = require('express');

const { register, login, getUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/getUser', getUser);

module.exports = router;
