const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    player: {
        type: String,
        required: true
    },
    gameSummary: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('PlayerHistory', historySchema);