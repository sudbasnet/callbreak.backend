const mongoose = require('mongoose');

const GameDetails = mongoose.Schema({
    gameId: {
        type: Number,
        required: true
    },
    player1: {
        type: String,
        required: true
    },
    player2: {
        type: String,
        required: true
    },
    player3: {
        type: String,
        required: true
    },
    player4: {
        type: String,
        required: true
    },
    winner: {
        type: String,
        required: false
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Game', GameDetails);