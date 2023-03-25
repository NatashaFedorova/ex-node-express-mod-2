const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { catchAsync, AppError } = require('../utils');
const { enums } = require('../constants');
require('dotenv').config();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

exports.signup = catchAsync(async (req, res) => {
  const newUserData = {
    ...req.body,
    role: enums.USER_ROLES_ENUM.USER,
  };

  const newUser = await User.create(newUserData);
  newUser.password = undefined;

  const token = signToken(newUser.id);

  res.status(201).json({
    user: newUser,
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new AppError(401, 'Not authorized'));

  const passwordIsValid = await user.checkPassword(
    password,
    user.password
  );

  if (!passwordIsValid)
    return next(new AppError(401, 'Not authorized'));

  user.password = undefined;

  const token = signToken(user.id);

  res.status(200).json({ user, token });
});
