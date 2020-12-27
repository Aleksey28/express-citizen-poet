const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  secondName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  middleName: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 30,
  },
  birthDate: {
    type: Date,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator: (v) => isURL(v),
      message: 'Для аватара необходимо указать URL',
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправльные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправльные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
