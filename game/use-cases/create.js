const Game = require('../game.model');

module.exports = async (req, res, next) => {
    const userId = req.userId;
    const gameType = req.params.gameType;

    try {
        const game = new Game({
            status: 'waiting',
            gameType: gameType,
            players: [{
                order: game.players.length,
                userType: 'player',
                userId: userId,
                pointsTotal: 0,
                pointsCurrentGame: 0,
                bet: 0
            }]
        });
        const savedGame = await game.save();
        res.status(200).json({ gameType: gameType, gameId: savedGame._id });
    } catch (err) {
        next(err);
    }
}