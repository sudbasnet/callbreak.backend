const router = require('express').Router();
const Game = require('../game.model');
const customError = require('../../_helpers/custom-error');

module.exports = async (req, res, next) => {
    const userId = req.userId;
    const gameId = req.body.gameId;

    try {
        gameToBeDeleted = await Game.findOne({ _id: gameId, createdBy: userId });
        // need to check if the game hasn't been started already.
        if (!gameToBeDeleted) {
            throw new customError('The game could not be deleted', '500', '');
        }
        await Game.deleteOne({ _id: gameId, createdBy: userId });
        res.status(200).json({ message: 'Game was deleted' });
    } catch (err) {
        next(err);
    }
};