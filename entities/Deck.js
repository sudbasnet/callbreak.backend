const Card = require('./Card');

module.exports = class Deck {
    constructor() {
        this.suites = ["hearts", "spades", "diamonds", "clubs"];
        this.faceCards = ["king", "queen", "jack", "ace"];
        this.numberCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
    }

    getFullDeck() {
        let deck = [];
        this.suites.forEach(suit => this.numberCards.forEach(numberCard => deck.push(new Card(suit, numberCard))));
        this.suites.forEach(suit => this.faceCards.forEach(faceCard => deck.push(new Card(suit, faceCard))));
        return deck;
    }

    getRandomLocation(len) {
        return Math.floor(Math.random() * Math.floor(len));
    }

    dealCards(numberOfCards, numberOfPlayers) {
        // eg: to deal 5 cards to 3 players, dealCards(5, 3)
        let deck = this.getFullDeck();
        let dealtCards = [];
        let i = 0;
        while (i < numberOfPlayers) {
            dealtCards.push({ spades: [], diamonds: [], clubs: [], hearts: [] });
            i++;
        }

        let cardsDealt = 0;
        let randomPosition = 0;
        let randomCard;

        while (deck.length > 0 && cardsDealt < numberOfCards * numberOfPlayers) {
            randomPosition = this.getRandomLocation(deck.length);
            randomCard = deck[randomPosition];

            if (randomCard.suit === 'hearts') {
                dealtCards[cardsDealt % numberOfPlayers].hearts.push(randomCard.value);
            } else if (randomCard.suit === 'clubs') {
                dealtCards[cardsDealt % numberOfPlayers].clubs.push(randomCard.value);
            } else if (randomCard.suit === 'spades') {
                dealtCards[cardsDealt % numberOfPlayers].spades.push(randomCard.value);
            } else if (randomCard.suit === 'diamonds') {
                dealtCards[cardsDealt % numberOfPlayers].diamonds.push(randomCard.value);
            }

            deck.splice(randomPosition, 1); // remove 1 card from position "randomPosition"
            cardsDealt++;
        }

        return { dealt: dealtCards, remaining: deck };
    }
}
