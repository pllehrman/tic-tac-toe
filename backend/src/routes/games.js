const express = require('express');
const router = express.Router();

const {
    getAllGames,
    newGame,
    getGame,
    deleteGame,
    updateGame
} = require('../controllers/games');

router.route('/').get(getAllGames).post(newGame); 
router.route('/:id').get(getGame).delete(deleteGame).put(updateGame);

module.exports = router;