const {
  Types: { ObjectId },
} = require('mongoose');
const User = require('../models/userModel');

const { AppError, catchAsync, validators } = require('../utils');

exports.checkTodoData = catchAsync(async (req, res, next) => {
  const { error, value } = validators.todoValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  req.body = value;

  next();
});
