const router = require('express').Router();
const { getPetitions } = require('../controllers/petitions');

router.get('/', getPetitions);

module.exports = router;
