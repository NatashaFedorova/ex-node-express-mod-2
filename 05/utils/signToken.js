const jwt = require('jsonwebtoken');
require('dotenv').config();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

module.exports = signToken;
