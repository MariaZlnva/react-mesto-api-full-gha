require('dotenv').config();
// Импорт npm-пакетов
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

// создаем приложение
const app = express();

// const path = require('path');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const { PORT, DB_ADDRESS } = require('./config');

const routerUsers = require('./routes/users');
const routerCard = require('./routes/cards');
const {
  createUser,
  login,
} = require('./controllers/userController');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFound');
const { REGEX_URL } = require('./constants/regex');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// подключение к серверу монго
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

// Парсинг входящих данных со стороны клиента
// app.use(express.json());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
// Парсинг кук
// app.use(cookieParser());

const corsOptions = {
  origin: [
    'https://mesto.zlnva.nomoredomains.monster',
    'http://mesto.zlnva.nomoredomains.monster',
    'https://localhost:3000',
    'http://localhost:3000',
    'https://localhost:3001',
    'http://localhost:3001',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Миддлвэры для безопасности (лимитер и хельмет)
app.use(limiter); // ограничим доступ
app.use(helmet()); // защитим приложение Node.js от уязвимостей и кибератак

app.use(requestLogger); // подключаем логгер запросов до всех обработчиков роутов

// Не забудьте удалить этот код после успешного прохождения ревью.
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Роутинг без авторизации
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEX_URL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

// Проверка на авторизацию
app.use(auth);

// Роутинг с авторизацией
app.use(routerUsers);
app.use(routerCard);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// обработчик ошибки
app.use(errorLogger); // подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок
app.use(errors()); // обработчик ошибок celebrate
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err; // если у ошибки нет статуса, выставляем 500
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});

// // при обращении через браузер index.html
// app.use(express.static(path.join(__dirname, 'public')));

// принимаем сообщения с PORT
app.listen(PORT, () => {
  console.log(`App listening port ${PORT}`);
});
