const mongoose = require('mongoose');

const playerHistory = mongoose.Schema({
    playerId: {
        type: Number,
        required: false
    },
    gameId: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('History', playerHistory);
