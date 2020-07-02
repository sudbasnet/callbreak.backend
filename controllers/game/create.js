const Game = require('../../models/Game');
const Player = require('../../models/User');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
    const userId = req.userId;
    const gameType = req.params.gameType;
    try {
        const user = await User.findById(userId);
        const game = new Game({
            status: 'waiting',
            players: { player1: { id: userId } }
        });
        const savedGame = await game.save();
        console.log(savedGame);
    } catch (err) {
        throw err;
    }
    res.status(200).json({ gameType: gameType, gameId: savedGame._id });
}