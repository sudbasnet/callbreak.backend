const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 120
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 225
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },

    active: {
        type: Boolean,
        default: false
    },
    validationToken: {
        type: String,
        required: false
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);