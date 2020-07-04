module.exports = {
    createGame: require('./use-cases/game-definition/create'),

    joinGame: require('./use-cases/game-definition/join'),

    pauseGame: require('./use-cases/game-definition/pause'),

    leaveGame: require('./use-cases/game-definition/leave'),

    startCallbreak: require('./use-cases/game-specific/callbreak/start')
}
