const Game = require('../../game.model');

module.exports = (req, res, next) => {
    const userId = req.userId;
    const gameType = req.gameType;
    const gameId = req.gameId;
    res.json({ userId: userId, gameType: gameType, gameId: gameId });
}