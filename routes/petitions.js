const router = require('express').Router();
const {
  getPetitions,
  getUserPetitions,
  createPetition,
  deletePetition,
  likePetition,
  dislikePetition,
  commentPetition,
} = require('../controllers/petitions');

router.get('/petitions', getPetitions);
router.get('/petitions/me', getUserPetitions);
router.post('/petitions', createPetition);
router.delete('/petitions/:petitionId', deletePetition);
router.put('/petitions/:petitionId/likes', likePetition);
router.delete('/petitions/:petitionId/likes', dislikePetition);
router.put('/petitions/:petitionId/comments', commentPetition);

module.exports = router;
