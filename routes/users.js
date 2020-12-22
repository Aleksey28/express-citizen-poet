const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/me', updateUserInfo);

module.exports = router;
