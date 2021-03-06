export class Card {
    constructor(strength, url, name) {
        this.strength = strength;
        this.url = url;
        this.name = name;
    }

    render() {
        const card = document.createElement("img");
        card.classList.add("table__card");
        card.src = this.url;
        card.alt = `card ${this.name}`;
        card.strength = this.strength;

        return card;
    }
}
