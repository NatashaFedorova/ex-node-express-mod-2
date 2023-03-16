const Joi = require('joi');

exports.createUserValidator = (data) =>
  Joi.object({
    name: Joi.string().min(2).max(10).required(),
    year: Joi.number().integer().min(1940).max(2023).required(),
  }).validate(data);
