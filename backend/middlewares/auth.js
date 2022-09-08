/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  // верифицируем токен
  let payload;

  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    next(new NotAuthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};
