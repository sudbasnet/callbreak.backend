class CardDeck {
    constructor() {
        this.suites = ["Hearts", "Spades", "Diamonds", "Clubs"];
        this.faceCards = ["King", "Queen", "Jack", "Ace"];
        this.numberCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
    }

    getFullDeck() {
        let deck = [];
        this.suites.forEach(suit => this.numberCards.forEach(numberCard => deck.push(numberCard.concat(' of ', suit))));
        this.suites.forEach(suit => this.faceCards.forEach(faceCard => deck.push(faceCard.concat(' of ', suit))));
        return deck;
    }

    getRandomLocation(len) {
        return Math.floor(Math.random() * Math.floor(len));
    }

    dealCards() {
        let deck = this.getFullDeck();
        let dealt = [[], [], [], []];
        let i = 0;
        let pos = 0;

        while (deck.length > 0) {
            pos = this.getRandomLocation(deck.length);
            dealt[i % 4].push(deck[pos]);
            // remove 1 card from position "pos"
            deck.splice(pos, 1);
            i++;
        }

        return dealt;
    }
}

module.exports = CardDeck;