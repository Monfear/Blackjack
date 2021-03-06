import { Hand } from "./Hand.js";

export class Player {
    constructor(name, money) {
        this.name = name;
        this.money = money;

        this.points = 0;
        this.hand = new Hand();
    }

    countPoints() {
        this.points = this.hand.countStrength();
        return this.points;
    }
}
