const Todo = require('../models/todoModel');
const { catchAsync } = require('../utils');

exports.homePage = (req, res) => {
  res.status(200).render('home', {
    title: 'home page',
    active: 'home',
  });
};

exports.todosPage = catchAsync(async (req, res) => {
  const todos = await Todo.find().populate('owner');

  res.status(200).render('todos', {
    title: 'todos page',
    active: 'todos',
    todos,
  });
});
