const Game = require('../../models/Game');
const Player = require('../../models/User');

module.exports = (req, res, next) => {
    const userId = req.userId;
    const gameType = req.params.gameType;
    const gameId = req.params.gameId;
    res.json({ userId: userId, gameType: gameType, gameId: gameId });
}