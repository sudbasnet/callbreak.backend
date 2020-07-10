const Game = require('../../../game.model');

const customError = require('../../../../_helpers/custom-error');

module.exports = async (req, res, next) => {
    const userId = req.userId;
    const gameType = req.params.gameType;
    const gameId = req.params.gameId;
    const bet = req.body.bet;

    try {
        const game = await Game.findById(gameId);

        if (!game) {
            throw customError('The game does not exist.', 404, null);
        }

        if (bet <= 0 || bet >= 13) {
            throw customError('The bet must be between 1 and 13.', 401, null);
        }

        const i = game.players.findIndex(x => x.userId === userId);
        game.players[i].bet = bet;
        const savedGame = await game.save();
        res.status(201).json(savedGame);
    } catch (err) {
        next(err);
    }
}