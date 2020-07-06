const Game = require('../../../game.model');

const Deck = require('../../../../entities/Deck');

const customError = require('../../../../_helpers/custom-error');

module.exports = async (req, res, next) => {
    const userId = req.userId;
    const gameType = req.params.gameType;
    const gameId = req.params.gameId;

    const deck = new Deck();
    const dealtCardsObject = deck.dealCards(13, 4); //dealing 13 cards to 4 players
    const remainingCards = dealtCardsObject.remaining;

    try {
        const game = await Game.findById(gameId);

        if (!game) {
            throw customError('The game does not exist.', 404, null);
        }

        const isValidPlayer = game.players.map(x => x.userId).includes(userId);

        if (isValidPlayer && game.status == 'waiting') {
            while (game.players.length < 4) {
                game.players.push({ userType: 'bot', userId: userId });
            }

            for (let i = 0; i < 4; i++) {
                game.players[i].cards = dealtCardsObject.dealt[i];
            }

            game.status = 'on';
            game.gameNumber = 1;
            game.round = {
                num: 1, // starts as round 1
                suit: null, // not thrown yet, so we dont know
                overridden: null, // is the turn overridden by a spade?
                cardsOnTheTable: [], // None at the start of the game
                turn: 1, // first turn
                nextPlayer: 0, // players.order
                winning: null
            };
            game.end = Date.now(); // gets updated at the end of each turn

            const savedGame = await game.save();
            res.status(200).json(savedGame);
        } else {
            throw customError('You cannot start this game.', 500, null);
        }
    } catch (err) {
        next(err);
    }
}