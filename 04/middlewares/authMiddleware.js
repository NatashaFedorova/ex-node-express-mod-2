const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { AppError, catchAsync, validators } = require('../utils');
require('dotenv').config();

exports.checkSignupData = catchAsync(async (req, res, next) => {
  const { error, value } = validators.signupUserValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  const { email } = value;

  const userExists = await User.exists({ email });

  if (userExists)
    return next(
      new AppError(409, 'User with this email already exists...')
    );
  req.body = value;

  next();
});

exports.checkLoginData = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1];

  if (!token) return next(new AppError(401, 'You are not logeed in'));

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decodedToken.id);

  req.user = currentUser;

  next();
});

// ця функція приймає req.user, тому має виконуватися після checkLoginData
exports.allowFor =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError(
          403,
          'You are not allowed to perform this action'
        )
      );
    if (roles.includes(req.user.role)) return next();
  };
