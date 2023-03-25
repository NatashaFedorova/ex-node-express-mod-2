const { catchAsync } = require('../utils');
const User = require('../models/userModel');

exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, birthyear, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    birthyear,
    role,
  });

  res.status(201).json({ newUser });
});

exports.getUsers = catchAsync(async (req, res) => {
  const users = await User.find().sort({ name: 1 }).lean();
  res.status(200).json({ users });
});

exports.getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userById = await User.findById(id).select('+password');
  userById.password = undefined; // password не передається у відповіді, ялее до цього моменту, його можна обробляти
  return res.send({ userById });
});

exports.updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, birthyear } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      birthyear,
    },
    { new: true }
  ).select('name birthyear');

  res.status(200).json({ updatedUser });
});

exports.deleteUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.sendStatus(204);
});
