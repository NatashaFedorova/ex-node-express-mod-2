const Joi = require('joi');

const { enums } = require('../constants');

const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

exports.createUserValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false }) // дозволяє повертатии більше однієї помилки одночасно
    .keys({
      name: Joi.string().max(10).alphanum().required(),
      email: Joi.string().email().required(),
      birthyear: Joi.number().integer().min(1940).max(2023).required(),
      password: Joi.string().regex(PASSWD_REGEX).min(8).max(128).required(),
      role: Joi.string().valid(...Object.values(enums.USER_ROLES_ENUM)),
    })
    .validate(data);

exports.updateUserValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false }) // дозволяє повертатии більше однієї помилки одночасно
    .keys({
      name: Joi.string().max(10).alphanum(),
      email: Joi.string().email(),
      birthyear: Joi.number().integer().min(1940).max(2023),
      role: Joi.string().valid(...Object.values(enums.USER_ROLES_ENUM)),
    })
    .validate(data);

exports.signupUserValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false }) // дозволяє повертатии більше однієї помилки одночасно
    .keys({
      name: Joi.string().max(15).required(),
      email: Joi.string().email().required(),
      birthyear: Joi.number().integer().min(1940).max(2023).required(),
      password: Joi.string().regex(PASSWD_REGEX).min(8).max(128).required(),
    })
    .validate(data);

exports.loginValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false }) // дозволяє повертатии більше однієї помилки одночасно
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(128).required(),
    })
    .validate(data);

exports.todoValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false }) // дозволяє повертатии більше однієї помилки одночасно
    .keys({
      title: Joi.string().min(2).max(30).required(),
      desc: Joi.string().min(2).max(400),
      due: Joi.string().required(),
    })
    .validate(data);
