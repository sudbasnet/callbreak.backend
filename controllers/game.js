exports.getCreateGame = (req, res, next) => {
    const gameName = req.params.name;
    if (gameName === 'callbreak') {
        res.send("<h1>The game is callbreak</h1>");
    }
    next();
};

exports.putUpdateGame = (req, res, next) => {
    // updates game's global status
    next();
};

exports.postEndGame = (req, res, next) => {
    // updates the game's global status and writes winner details in history table
    next();
};

exports.postJoinGame = (req, res, next) => {
    next();
};

exports.postLeaveGame = (req, res, next) => {
    next();
};
