const Post = require('../models/petition');

module.exports.getPetitions = (req, res, next) => {
  Post.find({})
    .then((posts) => res.send({ data: posts }))
    .catch((err) => next(err));
};
