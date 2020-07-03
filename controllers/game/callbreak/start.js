const Game = require('../../../models/Game');
const User = require('../../../models/User');
const customError = require('../../../helpers/custom-error');
const Deck = require('../../../entities/Deck');

module.exports = async (req, res, next) => {
    const userId = req.userId;
    const gameType = req.params.gameType;
    const gameId = req.params.gameId;
    const deck = new Deck();
    const dealtCards = deck.dealCards(13, 4); //dealing 13 cards to 4 players

    try {
        const user = await User.findById(userId);
        const game = await Game.findById(gameId);

        const isValidPlayer = game.players.map(x => x.userId).includes(user._id);

        if (isValidPlayer) {
            while (game.players.length < 4) {
                game.players.push({ userType: 'bot', userId: user._id });
            }
            for (let i = 0; i < 4; i++) {
                game.players[i].cards = dealtCards[i];
            }
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