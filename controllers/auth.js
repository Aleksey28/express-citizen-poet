const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequest = require('../errors/bad-request');
const Unauthorized = require('../errors/unauthorized');

const handleData = (data) => data.split('.').reverse().join('.');

module.exports.register = (req, res, next) => {
  const {
    password, firstName, secondName, middleName, birthDate, avatar,
  } = req.body;

  const email = req.body.email.toLowerCase();

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      firstName,
      secondName,
      middleName,
      birthDate: new Date(handleData(birthDate)),
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
  const { email, password } = req.body;

  return User.findUserByCredentials(email.toLowerCase(), password)
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
