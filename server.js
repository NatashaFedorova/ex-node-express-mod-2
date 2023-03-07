const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const { v4: uuid } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/v1/users', async (req, res) => {
  try {
    const { name, year } = req.body;
    const dataFromDB = await fs.readFile('./moduls.json');
    const users = JSON.parse(dataFromDB);
    const newUser = {
      id: uuid(),
      name,
      year,
    };
    users.push(newUser);
    await fs.writeFile('./moduls.json', JSON.stringify(users));
    return res.status(200).json({ user: newUser });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.get('/api/v1/users', async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile('./moduls.json'));
    return res.status(200).json({ users });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.get('/api/v1/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const users = JSON.parse(await fs.readFile('./moduls.json'));
    const userById = users.find((el) => el.id === id);
    return res.send({ userById });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.get('*', (req, res) => {
  res.status(404).json({
    msg: 'Not found',
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Application up and runing on port ${port}!`);
});
