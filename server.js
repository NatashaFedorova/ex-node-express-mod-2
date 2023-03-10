const express = require('express');
const cors = require('cors');

const useRrouter = require('./routes/userRoutes');

const app = express();

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

  res.status(status).json({ msg: err.message });
  next();
});

const port = 3000;

app.listen(port, () => {
  console.log(`Application up and runing  on port ${port}!`);
});
