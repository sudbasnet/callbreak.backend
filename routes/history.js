const express = require('express');
const router = express.Router();

const Game = require('../models/Game');
const Turn = require('../models/Turn');

// show a list of all the recently played games
// will sort with javascript
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (err) {
        res.json({ message: err });
    }
});


// data will be sent after each turn
router.post('/turn', async (req, res) => {
    const turn = new Turn({
        gameId: req.body.gameId,
        player1: {
            points: req.body.player1Points,
            threw: req.body.player1threw,
            cardsRemaining: req.body.player1Cards
        },
        player2: {
            points: req.body.player2Points,
            threw: req.body.player2threw,
            cardsRemaining: req.body.player2Cards
        },
        player3: {
            points: req.body.player3Points,
            threw: req.body.player3threw,
            cardsRemaining: req.body.player3Cards
        },
        player4: {
            points: req.body.player4Points,
            threw: req.body.player4threw,
            cardsRemaining: req.body.player4Cards
        },
        cardsRemoved: req.body.cardsRemoved,
        round: req.body.round,
        winningPlayer: req.body.winningPlayer
    });

    try {
        const currentTurn = await turn.save();
        res.json(currentTurn);
    } catch (err) {
        res.json({ message: err });
    }
});


// send data about the game at start or at the end
router.post('/game', async (req, res) => {
    const game = new Game({
        gameId: req.body.gameId,
        player1: req.body.player1,
        player2: req.body.player2,
        player3: req.body.player3,
        player4: req.body.player4,
        winner: req.body.winner
    });

    try {
        const currentGame = await game.save();
        res.json(currentGame);
    } catch (err) {
        res.json({ message: err });
    }
});


// get the game based on its gameId
router.get('/:gameId', async (req, res) => {
    try {
        const turnDetails = await Turn.find({ gameId: req.params.gameId });
        res.json(turnDetails);
    } catch (err) {
        res.json({ message: err });
    }

});


// delete the game based on its gameId
router.delete('/:gameId', async (req, res) => {
    try {
        const gameRemoved = await Game.remove({ gameId: req.params.gameId });
        const turnRemoved = await Turn.remove({ gameId: req.params.gameId });
        res.json(gameRemoved);
    } catch (err) {
        res.json({ message: err });
    }
});


// update the winner and end-time of a game
router.patch('/:gameId', async (req, res) => {
    try {
        const gameUpdated = await Game.updateOne({ gameId: req.params.gameId },
            { $set: { winner: req.body.winner, endTime: new Date() } });
        res.json(gameUpdated);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;

