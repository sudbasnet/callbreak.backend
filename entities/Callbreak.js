const Deck = require('./Deck');

module.exports = class Callback {
    constructor() {

    }

    static validMoves = (cardsOnTable, playerCards) => {
        if (cardsOnTable.length === 0) {
            return playerCards;
        }
        const starterSuit = cardsOnTable[0].suit;
        let overridden = false;

        let maxCardOnTable = cardsOnTable[0];

        for (let card of cardsOnTable) {

            if (card.suit === starterSuit && Deck.getValue(card) > Deck.getValue(maxCardOnTable)) {
                maxCardOnTable = card;
            }

            if (card.suit === 'spades' && starterSuit != 'spades') {
                overridden = true;
            }
        }

        let validSuitPlayerCards = playerCards[starterSuit];
        if (!overridden && validSuitPlayerCards.length > 0) {
            for (let vpcard of validSuitPlayerCards) {

            }
        }
    }

    static winnerCardIndex(cardsOnTable) {

    }
}