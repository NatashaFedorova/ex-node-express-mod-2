const express = require('express');
const { signup, login } = require('../controllers/authController');
const { checkSignupData } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', checkSignupData, signup);
router.post('/login', login);

module.exports = router;
