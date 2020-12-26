const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequest = require('../errors/bad-request');
const Unauthorized = require('../errors/unauthorized');

module.exports.register = (req, res, next) => {
  console.log(2);
  const {
    email, password, firstName, secondName, middleName, birthDate, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      firstName,
      secondName,
      middleName,
      birthDate: new Date(birthDate),
      avatar,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      next(new BadRequest(err.message));
      // next(err);
    });
};

module.exports.login = (req, res, next) => {
  console.log(1);
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '1d' }),
      });
    })
    .catch((err) => {
      next(new Unauthorized(err.message));
      // next(err);
    });
};
