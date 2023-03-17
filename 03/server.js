const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const useRrouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

mongoose
  .connect(process.env.MONGO_URL || 'mongodb:127.0.0.1:27017/test')
  .then((connection) => {
    console.log('MondoDB connected ');
  });

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', useRrouter);

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

app.listen(port, () => {
  console.log(`Application up and runing  on port ${port}!`);
});
