const fs = require('fs').promises;

const { AppError, catchAsync, validators } = require('../utils');

exports.checkUserData = (req, res, next) => {
  const { error, value } = validators.createUserValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  req.body = value;

  next();
};

exports.checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (id.length < 10) {
    // додаємо статус та текст помилці, передаємо далі
    return next(new AppError(400, 'Invalid user id...'));
  }

  const users = JSON.parse(await fs.readFile('./models/moduls.json'));
  const userById = users.find((el) => el.id === id);

  if (userById) return next();

  return next(new AppError(404, 'User this id does not exist...'));
});
