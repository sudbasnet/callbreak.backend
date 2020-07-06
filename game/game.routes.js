const router = require('express').Router();

const gameController = require('./game.controller');

// CALLBREAK specific routes
router.get('/:gameId/start', gameController.startCallbreak); // success method 200

// Other Routes
router.get('/:gameType/new', gameController.createGame); // returns a gameId

router.get('/:gameType/:gameId/join', gameController.joinGame); // success method 200

router.get('/:gameType/:gameId/pause', gameController.pauseGame); // success method 200

router.get('/:gameType/:gameId/leave', gameController.leaveGame); // succcess with method 200

module.exports = router;