const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');
const petitions = require('./routes/petitions');
const poems = require('./routes/poems');

const auth = require('./middlewares/auth');

const { register, login } = require('./controllers/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  console.log(res);
  next();
});

mongoose.connect('mongodb://localhost:27017/authdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Массив разешённых доменов
// const allowedCors = [
//   'https://aleksey28.github.io/citizen-poet/',
//   'http://localhost:3000',
// ];
//
// app.use((req, res, next) => {
//   const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок
//
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);
app.post('/signup', register);
app.post('/signin', login);
app.use(auth);
app.use('/', users);
app.use('/', petitions); // добавился маршрут
app.use('/', poems);

app.use(errorLogger);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
});
