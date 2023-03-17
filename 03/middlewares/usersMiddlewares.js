const {
  Types: { ObjectId },
} = require('mongoose');
const User = require('../models/userModel');

const { AppError, catchAsync, validators } = require('../utils');

exports.checkUserData = catchAsync(async (req, res, next) => {
  const { error, value } = validators.createUserValidator(req.body);

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

exports.checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    // додаємо статус та текст помилці, передаємо далі
    return next(new AppError(400, 'Invalid user id...'));
  }

  const userExists = await User.exists({ _id: id });

  if (!userExists)
    return next(new AppError(409, 'User not found...'));
  next();
});
