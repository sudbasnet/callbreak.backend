const Game = require('../../../game.model');

const customError = require('../../../../_helpers/custom-error');

// GET: /:gameType/:gameId/valid-moves
// get playerId from the header
// get gameId from the request
// if next-turn > player's turn in the game ( if player hasn't already played)
// send next moves

module.exports = async (req, res, next) => {
    try {
        userId = req.userId;
        game = await Game.findById(req.params.gameId);
        if (!game) {
            throw customError('Game not found', 404, '');
        }

        if (game.round.playedTheirHands.includes(userId)) {
            throw customError('Player has already made a move.', 500, '');
        }

        const cardsOnTable = game.cardsOnTable;
        const i = game.players.findIndex(x => x.userId === userId);
        const playerCards = game.players.cards; // type object, { spades: [], hearts: [], diamonds: [], clubs: []}

        console.log(playerCards);
        console.log(cardsOnTable);
        next();
    }
    catch (err) {
        next(err);
    }
}