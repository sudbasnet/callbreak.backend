const express = require('express');
const router = express.Router();

const Game = require('../../models/Game');
const CardDeck = require('../../entities/CardDeck');

router.post('/create', async (req, res, next) => {
    const game = new Game({
        status: "Waiting",
        players: {
            player1: {
                id: req.body.playerId
            }
        }
    });

    try {
        const newGame = await game.save();
        res.json(newGame);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/join', async (req, res) => {
    // get the gameId and playerId
    // check if game is in "Waiting" status
    // add the player to the game
    // if all 4 players have been added, make status "On"
});

router.post('/leave', async (req, res) => {
    // get the gameId and playerId
    // Check if player exists in the game, then check game status
    // If game hasnt started yet, just delete the player from game
    // If game is ongoing, replace Player with bot
});

router.post('/start', async (req, res) => {
    // expects a gameId to start
    // includeBots field is also required
    // first check if there are 4 players, if not add a bot
    // if done, distribute cards
    let cardDeck = new CardDeck();
    let dealtCards = cardDeck.dealCards();
});

module.exports = router;