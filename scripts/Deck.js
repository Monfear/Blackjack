import { Card } from "./Card.js";
import { cards } from "./cards.js";

const BACK_CARD_URL = "./img/cards/back.png";

export class Deck {
    constructor() {
        this.init();
    }

    deckOfCards = [];

    init() {
        cards.forEach((card) => {
            this.deckOfCards.push(new Card(card.strength, card.url, card.name));
        });
    }

    shuffle() {
        for (let i = this.deckOfCards.length - 1; i > 0; i--) {
            const randomNumber = Math.floor(Math.random() * i);

            [this.deckOfCards[i], this.deckOfCards[randomNumber]] = [this.deckOfCards[randomNumber], this.deckOfCards[i]];
        }

        return this.deckOfCards;
    }

    reset() {
        this.deckOfCards = [];
    }

    pickOneCard() {
        return this.deckOfCards.shift();
    }

    createCardBack() {
        return new Card(0, BACK_CARD_URL, "blank");
    }
}
