import { Common } from "./Common.js";

export class Table extends Common {
    constructor() {
        super();

        this.connectElements();
    }

    connectElements() {
        this.dealerCardsArea = this.getElement(this.elementsOfDOM.dealerCardsArea);
        this.playerCardsArea = this.getElement(this.elementsOfDOM.playerCardsArea);
        this.spnDealerPoints = this.getElement(this.elementsOfDOM.spnDealerPoints);
        this.spnPlayerPoints = this.getElement(this.elementsOfDOM.spnPlayerPoints);
    }

    showDealerCard(card) {
        this.dealerCardsArea.append(card.render());
    }

    showPlayerCard(card) {
        this.playerCardsArea.append(card.render());
    }
}
