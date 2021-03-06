import { WINNING_POINTS } from "./Game.js";

export class Hand {
    constructor() {
        this.ownedCards = [];
    }

    addCardToOwned(card) {
        this.ownedCards.push(card);
    }

    countTwoAces() {
        return this.ownedCards.filter((card) => card.name === "ace").length === 2 ? true : false;
    }

    checkAces() {
        return this.ownedCards.every((card) => card.name === "ace");
    }

    checkBlackjack() {
        if (this.ownedCards.length === 2 && this.countStrength() === WINNING_POINTS) {
            return true;
        } else {
            return false;
        }
    }

    countStrength() {
        let totalStrength = 0;

        if (this.checkAces()) {
            return (totalStrength = 11 + this.ownedCards.length - 1);
        }

        this.ownedCards.forEach((card) => {
            if (this.ownedCards.length === 2 && card.name === "ace") {
                totalStrength += 11;
            } else {
                totalStrength += card.strength;
            }
        });

        return totalStrength;
    }
}
