const mongoose = require('mongoose');

const petitionSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  description: {
    type: String,
    minLength: 2,
    maxLength: 1024,
    required: true,
  },
  department: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  comments: [{
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    text: {
      type: String,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('petition', petitionSchema);
