const fs = require('fs').promises;
const { v4: uuid } = require('uuid');

const { catchAsync } = require('../utils');

exports.createUser = catchAsync(async (req, res) => {
  const { name, year } = req.body;
  const dataFromDB = await fs.readFile('./models/moduls.json');
  const users = JSON.parse(dataFromDB);
  const newUser = {
    id: uuid(),
    name,
    year,
  };
  users.push(newUser);
  await fs.writeFile('./models/moduls.json', JSON.stringify(users));
  return res.status(201).json({ user: newUser });
});

exports.getUsers = catchAsync(async (req, res) => {
  const users = JSON.parse(await fs.readFile('./models/moduls.json'));
  return res.status(200).json({ users });
});

exports.getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const users = JSON.parse(await fs.readFile('./models/moduls.json'));
  const userById = users.find((el) => el.id === id);
  return res.send({ userById });
});

exports.updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, year } = req.body;
  const users = JSON.parse(await fs.readFile('./models/moduls.json'));
  const userById = users.find((el) => el.id === id);
  if (name) userById.name = name;
  if (year) userById.year = year;

  const userByIdIdx = users.findIndex((el) => el.id === id);
  users[userByIdIdx] = userById;
  await fs.writeFile('./models/moduls.json', JSON.stringify(users));
  res.status(200).json({ userById });
});

exports.deleteUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const users = JSON.parse(await fs.readFile('./models/moduls.json'));
  const updateUsers = users.filter((el) => el.id !== id);
  await fs.writeFile(
    './models/moduls.json',
    JSON.stringify(updateUsers)
  );
  res.sendStatus(204);
});
