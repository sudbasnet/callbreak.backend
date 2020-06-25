const express = require('express');
const router = express.Router();


/*

Backend needs to receive the following information:
---------------------------------------------------
1. Needs to first create the game metadata, fetches this everytime it gets a API call.
2. Metadata should include:
     gameId, playerIds, dealer, gameStatus ('On', 'Cancelled', 'Ended'), startTime, finishTime.
     For each player, it should have assignedCards, remainingCards

Save the turns
--------------
1. gameId, roundNo, turnNo, playerId, cardThrown,

Save Player History
-------------------
1. playerId, gameId

Information coming from the frontend:
-------------------------------------
1. gameId (identifies which game)
2. playerId (identifies the player)
3. gameRound (game has 5 rounds)
3. turnNo (game has 13 turns)


When a new game request is received, we must create a new game instance, so there should be a game class?
A GameId should be generated so that the other players could join it
Status of game should be included: ('On', 'Waiting', 'Ended')

-- Full Game Status --
// constantly updates
{
     "gameId": "xxx",
     "status": ""
     "players": {
          "player1": {
               id: ,
               cards: {
                    "spades": [],
                    "clubs": [],
                    "hearts": [],
                    "diamonds": []
               }
          },
          "player2": {
               id: ,
               cards: {
                    "spades": [],
                    "clubs": [],
                    "hearts": [],
                    "diamonds": []
               }
          },
          "player3": {
               id: ,
               cards: {
                    "spades": [],
                    "clubs": [],
                    "hearts": [],
                    "diamonds": []
               }
          },
          "player4": {
               id: ,
               cards: {
                    "spades": [],
                    "clubs": [],
                    "hearts": [],
                    "diamonds": []
               }
          }
     },
     "start": None,
     "finish": None,

     "gameNumber": 3,
     "round": {
          "number": 1,
          "suit": "hearts",
          "overridden": false,
          "cardsOnTheTable": ["Ace of Hearts"]
          "turn": 3,
          "nextPlayer": "2",
          "winner": "player1"
     },

     "points": {
          "total":{
               "player1": 2,
               "player2": 3,
               "player3": 3,
               "player4": 2
          },
          "thisGame": {
               "player1": 2,
               "player2": 3,
               "player3": 3,
               "player4": 2
          }
     }
}

-- Full Turn Details --
// constantly inserts
{
     "gameId": "xxx",
     "game": 1,
     "round": 13,
     "turn": 3,
     "player": "player2",
     "card": "Ace of Hearts"
}

-- After game finishes, save player history
{
     playerId: "",
     gameId: ""
}
*/