const mongoose = require('mongoose');

// we will use mongoDb's _id field as the game's id
const GameStatus = mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    gameType: {
        type: String,
        required: true
    },
    players: {
        type: {
            player1: {
                type: {
                    id: {
                        type: Number,
                        required: true
                    },
                    cards: {
                        type:
                        {
                            spades: [String],
                            hearts: [String],
                            clubs: [String],
                            diamonds: [String]
                        }
                    }
                }
            },
            player2: {
                type: {
                    id: {
                        type: Number,
                        required: true
                    },
                    cards: {
                        type:
                        {
                            spades: [String],
                            hearts: [String],
                            clubs: [String],
                            diamonds: [String]
                        },
                        required: false
                    }
                }
            },
            player3: {
                type: {
                    id: {
                        type: Number,
                        required: true
                    },
                    cards: {
                        type:
                        {
                            spades: [String],
                            hearts: [String],
                            clubs: [String],
                            diamonds: [String]
                        }
                    }
                }
            },
            player4: {
                type: {
                    id: {
                        type: Number,
                        required: true
                    },
                    cards: {
                        type:
                        {
                            spades: [String],
                            hearts: [String],
                            clubs: [String],
                            diamonds: [String]
                        }
                    }
                }
            }
        },
        required: false
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: Date.now
    },
    gameNumber: {
        type: Number,
        required: false
    },
    round: {
        type: {
            num: Number,
            suit: String,
            overridden: Boolean,
            cardsOnTheTable: [String],
            turn: Number,
            nextPlayer: String,
            winning: String
        },
        required: false
    },
    points: {
        type: {
            total: {
                type: {
                    player1: Number,
                    player2: Number,
                    player3: Number,
                    player4: Number,
                },
                required: false
            },
            currentgame: {
                type: {
                    player1: Number,
                    player2: Number,
                    player3: Number,
                    player4: Number,
                },
                required: false
            }
        },
        required: false
    }
});

module.exports = mongoose.model('Game', GameStatus);