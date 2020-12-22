const Petition = require('../models/petition');
const NotFoundErr = require('../errors/not-found-err');
const BedRequest = require('../errors/bad-request');

const getPetitions = (req, res, next) => {
  Petition.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const getUserPetitions = (req, res, next) => {
  Petition.find({ owner: req.user._id })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const createPetition = (req, res, next) => {
  const { title, description, department } = req.body;
  Petition.create({
    title, description, department, owner: req.user._id,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => next(new BedRequest(err.message)));
};

const deletePetition = (req, res, next) => {
  Petition.findOneAndDelete({
    _id: req.params.petitionId,
    owner: req.user._id,
  })
    .then((data) => {
      if (!data) {
        throw new NotFoundErr('Нет петиции с таким id для текущего пользователя');
      }
      res.send(data);
    })
    .catch(next);
};

const likePetition = (req, res, next) => {
  Petition.findByIdAndUpdate(
    req.params.petitionId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundErr('Нет карточки с таким id');
      }
      res.send(data);
    })
    .catch(next);
};

const dislikePetition = (req, res, next) => {
  Petition.findByIdAndUpdate(
    req.params.petitionId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundErr('Нет карточки с таким id');
      }
      res.send(data);
    })
    .catch(next);
};

const commentPetition = (req, res, next) => {
  const { text } = req.body;
  Petition.findByIdAndUpdate(
    req.params.petitionId,
    {
      $addToSet: { comments: { owner: req.user._id, text } },
    }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundErr('Нет карточки с таким id');
      }
      res.send(data);
    })
    .catch(next);
};

module.exports = {
  getPetitions,
  getUserPetitions,
  createPetition,
  deletePetition,
  likePetition,
  dislikePetition,
  commentPetition,
};
