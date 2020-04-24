const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Token', tokenSchema);