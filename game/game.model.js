const mongoose = require('mongoose');

// we will use mongoDb's _id field as the game's id
const GameStatus = mongoose.Schema({
    status: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
            },
            bet: { type: Number }
        }],
        validate: [(playersArray) => playersArray.length <= 4, 'Game is full.'],
        required: true
    },
    start: { type: Date, default: Date.now },
    end: { type: Date, default: Date.now },
    gameNumber: { type: Number }, // 4 subgames in on main game
    round: { // 13 rounds in each subgame
        type: {
            num: { type: Number },
            starterPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //player that started the round
            playedTheirHands: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] },
            starterSuit: { type: String },
            overriddenBySpade: { type: Boolean }, // has spades taken over?
            cardsOnTheTable: { type: [String] }, // 4 or less cards
            turn: { type: Number }, // 4 turns in each round
            nextPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // the player who can make a move (player's ID)
            winningThisTurn: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // the player that's winning this round so far
        }
    }
});

module.exports = mongoose.model('Game', GameStatus);