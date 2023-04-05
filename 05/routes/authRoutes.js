const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { checkSignupData } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', checkSignupData, signup);
router.post('/login', login);

// PASSWORD RESTORE
// post req.body => user email => send one time password (OTP) by email // return void
// otp - one time password
router.post('/forgot-password', forgotPassword);

// patch req.params (OTP) + req.body (new password) => update user in DB
router.patch('/reset-password/:otp', resetPassword);

module.exports = router;
