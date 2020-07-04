const Game = require('../../../models/Game');
const User = require('../../../models/User');

const customError = require('../../../helpers/custom-error');

module.exports = async (req, res, next) => {
    const userId = req.userId;
    const gameType = req.params.gameType;
    const gameId = req.params.gameId;

    try {
        const user = await User.findById(userId);
        const game = await Game.findById(gameId);

        const playerAlreadyJoined = game.players.map(x => x.userId).includes(user._id);

        if (playerAlreadyJoined) {
            throw customError('Cannot join same game again.', 500, null);
        }

        if (game.players.length < 5) {
            game.players.push({ order: game.players.length, userType: 'player', userId: user._id });
            game.end = Date.now();
            const savedGame = await game.save();
            res.status(200).json(savedGame);
        } else {
            throw customError('The game is already full.', 500, null);
        }
    } catch (err) {
        next(err);
    }
}