const Joi = require('joi');

exports.createUserValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().min(2).max(10).required(),
      email: Joi.string(),
      birthyear: Joi.number()
        .integer()
        .min(1940)
        .max(2023)
        .required(),
      password: Joi.string().min(4),
      role: Joi.string(),
    })
    .validate(data);
