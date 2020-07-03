exports.getPossibleMoves = (req, res, next) => {
    // takes in the gameId
    // returns valid moves ranked in order of best moves
    // for the player whose turn it is
    next();
};

exports.postProcessHand = (req, res, next) => {
    // processes the hand and returns the winner's info
    next();
};

exports.getDealCards = (req, res, next) => {
    next();
};