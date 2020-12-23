const router = require('express').Router();
const {
  translateToPoem,
} = require('../controllers/poems');

router.get('/poems', translateToPoem);

module.exports = router;
