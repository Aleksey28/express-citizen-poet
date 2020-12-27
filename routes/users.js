const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.get('/users/:id', getUser);
router.patch('/users/me', updateUserInfo);

module.exports = router;
