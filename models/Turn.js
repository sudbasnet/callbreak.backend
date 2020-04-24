const mongoose = require('mongoose');

const TurnDetails = mongoose.Schema({
    gameId:
    {
        type: Number,
        required: true
    },
    player1:
    {
        type: { points: String, threw: String, cardsRemaining: [String] },
        required: true
    },
    player2:
    {
        type: { points: String, threw: String, cardsRemaining: [String] },
        required: true
    },
    player3:
    {
        type: { points: String, threw: String, cardsRemaining: [String] },
        required: true
    },
    player4:
    {
        type: { points: String, threw: String, cardsRemaining: [String] },
        required: true
    },
    cardsRemoved:
    {
        type: [String],
        required: true
    },
    round:
    {
        type: Number,
        required: true
    },
    winningPlayer:
    {
        type: String,
        required: true
    },
    currentTime:
    {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Turn', TurnDetails);