const Post = require('../models/post');

module.exports.getPosts = (req, res, next) => {
  Post.find({})
    .then((posts) => res.send({ data: posts }))
    .catch((err) => next(err));
};
