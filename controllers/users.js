const User = require('../models/user');
const NotFoundErr = require('../errors/not-found-err');

const getUsers = (req, res, next) => {
  console.log(5);
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new NotFoundErr('Нет пользователя с таким id');
      }
      res.send(data);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (!data) {
        throw new NotFoundErr('Нет пользователя с таким id');
      }
      res.send(data);
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const {
    email, firstName, secondName, middleName, birthDate, avatar,
  } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      email, firstName, secondName, middleName, birthDate: new Date(birthDate), avatar,
    },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundErr('Нет пользователя с таким id');
      }
      res.send(data);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getUserInfo,
  updateUserInfo,
};
