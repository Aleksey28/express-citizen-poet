const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./routes/users');
const petitions = require('./routes/petitions');
const poems = require('./routes/poems');

const auth = require('./middlewares/auth');

const { register, login } = require('./controllers/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/authdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

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
  console.log(4);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(PORT);
  console.log(BASE_PATH);
});
