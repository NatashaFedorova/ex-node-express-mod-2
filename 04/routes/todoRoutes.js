const express = require('express');

const {
  createTodo,
  getTodoList,
} = require('../controllers/todoController');

const { checkTodoData } = require('../middlewares/todoMiddlewares');
const { checkLoginData } = require('../middlewares/authMiddleware');
const { enums } = require('../constants');

const router = express.Router();

// user тає бути залогінений, щоб робити запити перераховані нижче  - ПОРЯДОК ВАЖЛИВИЙ
router.use(checkLoginData);

router.post('/', checkTodoData, createTodo);
router.get('/', getTodoList);

module.exports = router;
