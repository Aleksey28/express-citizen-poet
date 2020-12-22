const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const auth = require('./middlewares/auth');

const { register, login } = require('./controllers/auth');

const { requestLogger, errorLoger } = require('./middlewares/logger');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/authdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);
app.post('/signup', register);
app.post('/signin', login);
app.use(auth);
app.use('/posts', require('./routes/posts')); // добавился маршрут

app.use(errorLoger);

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
});
