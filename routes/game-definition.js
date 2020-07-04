const router = require('express').Router();

const createGame = require('../controllers/game/game-definition/create');

const joinGame = require('../controllers/game/game-definition/join');

const pauseGame = require('../controllers/game/game-definition/pause');

const leaveGame = require('../controllers/game/game-definition/leave');

// ROUTES
router.get('/:gameType/new', createGame); // returns a gameId

router.get('/:gameType/:gameId/join', joinGame); // success method 200

router.get('/:gameType/:gameId/pause', pauseGame); // success method 200

router.get('/:gameType/:gameId/leave', leaveGame); // succcess with method 200

module.exports = router;