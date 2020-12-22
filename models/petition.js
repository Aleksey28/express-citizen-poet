const mongoose = require('mongoose');

const petitionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('petition', petitionSchema);
