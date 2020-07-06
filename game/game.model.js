const mongoose = require('mongoose');

// we will use mongoDb's _id field as the game's id
const GameStatus = mongoose.Schema({
    status: { type: String, required: true },
    gameType: { type: String, required: true },
    players: {
        type: [{
            userType: { type: String, required: true },
            order: { type: Number, required: true },
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            pointsTotal: { type: Number },
            pointsCurrentGame: { type: Number },
            cards: {
                type:
                {
                    spades: { type: [String] },
                    hearts: { type: [String] },
                    clubs: { type: [String] },
                    diamonds: { type: [String] },
                }
            }
        }],
        validate: [(playersArray) => playersArray.length <= 4, 'Game is full.'],
        required: true
    },
    start: { type: Date, default: Date.now },
    end: { type: Date, default: Date.now },
    gameNumber: { type: Number },
    round: {
        type: {
            num: { type: Number },
            suit: { type: String },
            overridden: { type: Boolean },
            cardsOnTheTable: { type: [String] },
            turn: { type: Number },
            nextPlayer: { type: String },
            winning: { type: String }
        }
    }
});

module.exports = mongoose.model('Game', GameStatus);