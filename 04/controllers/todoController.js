const { catchAsync } = require('../utils');
const Todo = require('../models/todoModel');

exports.createTodo = catchAsync(async (req, res) => {
  const { title, desc, due } = req.body;
  const newTodoData = {
    owner: req.user,
    title,
    desc,
    due,
  };

  const newTodo = await Todo.create(newTodoData);

  res.status(201).json({ todo: newTodo });
});

// краще на req.query написати валідацію
// skip - номер в колекції
// page 1 -> skip 0
// page 2 -> skip 5
// page 3 -> skip 10

exports.getTodoList = catchAsync(async (req, res) => {
  const {
    sort, order, page, limit, search
  } = req.query;

  const findOptions = search
    ? {
      $or: [
        {
          title: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          desc: {
            $regex: search,
            $options: 'i',
          },
        },
      ],
    }
    : {};

  const todosQuery = Todo.find(findOptions);
  todosQuery.sort(`${order === 'DESC' ? '-' : ''}${sort}`);

  const paginationPage = +page || 1;
  const PaginationLimit = +limit || 5;
  const skip = (paginationPage - 1) * PaginationLimit;

  todosQuery.skip(skip).limit(PaginationLimit);

  const todos = await todosQuery;

  const todosCount = await Todo.count(findOptions);

  res.status(200).json({ totals: todosCount, todos });
});
