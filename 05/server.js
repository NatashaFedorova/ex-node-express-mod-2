const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const authRrouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const todoRouter = require('./routes/todoRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// connect template engine - pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

mongoose
  .connect(process.env.MONGO_URL || 'mongodb:127.0.0.1:27017/test')
  .then((connection) => {
    console.log('MondoDB connected ');
  });

app.use(cors());
app.use(express.json());
app.use(express.static('static'));

app.use('/', viewRouter);
app.use('/api/v1/auth', authRrouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', todoRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    msg: 'Not found',
  });
});

// global error - цей middleware ловить помилки(н., id невалідний)
app.use((err, req, res, next) => {
  const { status } = err;
  res.status(status || 500).json({ msg: err.message });

  next();
});

const port = process.env.PORT || 8081;

module.exports = app.listen(port, () => {
  console.log(`Application up and running on port ${port}`);
});
