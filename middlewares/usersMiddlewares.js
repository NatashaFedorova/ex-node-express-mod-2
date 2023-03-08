const fs = require('fs').promises;

exports.checkUserData = (req, res, next) => {
  console.log('New data:', req.body);

  next();
};

exports.checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id.length < 10) {
      // додаємо статус та текст помилці, передаємо далі
      const error = new Error('Invalid user id...');
      error.status = 400;
      return next(error);
    }

    const users = JSON.parse(await fs.readFile('./models/moduls.json'));
    const userById = users.find((el) => el.id === id);

    if (userById) return next();

    const error = new Error('User not found');
    error.status = 404;
    next(error);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
