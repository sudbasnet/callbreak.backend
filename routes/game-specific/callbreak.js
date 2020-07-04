const router = require('express').Router();

const startCallbreak = require('../../controllers/game/callbreak/start');

router.get('/:gameId/start', startCallbreak); // success method 200

module.exports = router;