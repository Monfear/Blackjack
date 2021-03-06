import { Common } from "./Common.js";

export class Result extends Common {
    constructor() {
        super();

        this.element = this.getElement(this.elementsOfDOM.divModalResult);
        this.connectParts();
    }

    connectParts() {
        this.spnPlayerName = this.getElement(this.elementsOfDOM.spnPlayerName);
        this.btnNextRound = this.getElement(this.elementsOfDOM.btnNextRound);
        this.spnBlackJackInfo = this.getElement(this.elementsOfDOM.spnBlackjackInfo);
    }

    setWinner(winner) {
        this.spnPlayerName.innerText = winner;
    }

    setEndGame() {
        this.element.childNodes[3].remove();
        this.spnPlayerName.innerText = "You lost all your money";
        this.btnNextRound.innerText = "Try again";
        this.btnNextRound.addEventListener("click", () => location.reload());
    }

    show() {
        this.element.classList.remove("hide");
    }

    hide() {
        this.element.classList.add("hide");
    }
}
