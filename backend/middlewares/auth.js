/* eslint-disable linebreak-style */
const jsonwebtoken = require('jsonwebtoken');

// const { JWT_SECRET } = require('../config');
const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  console.log('пришли проходить аутентификацию');
  const { authorization } = req.headers;
  // убеждаемся, что заголовок есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  // если токен есть - извлекаем его и убираем приставку Bearer
  const token = authorization.replace('Bearer ', '');
  // const { jwt } = req.cookies;
  // if (!jwt) {
  //   return next(new UnauthorizedError('Необходима авторизация'));
  // }
  let payload;
  try { // проверяем что токен тот самый
    payload = jsonwebtoken.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'jwt_key_dev');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  // req.user = {
  //   _id: payload._id,
  // };
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};
