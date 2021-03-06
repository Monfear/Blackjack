import { Common } from "./Common.js";
import { Deck } from "./Deck.js";
import { Player } from "./Player.js";
import { Table } from "./Table.js";
import { Result } from "./Result.js";
import { Hand } from "./Hand.js";

export const WINNING_POINTS = 21;

class Game extends Common {
    constructor() {
        super();

        this.dealer = new Player("Dealer", 50000);
        this.player = new Player("Player", 500);

        this.deck = new Deck();
        this.table = new Table();

        this.result = new Result();

        this.init();
    }

    betAmount = 0;
    whoWins = null;
    drawName = "Nobody";

    init() {
        this.connectDOM();
        this.setupListeners();

        this.setStartedSettings();
    }

    connectDOM() {
        this.btnDeal = this.getElement(this.elementsOfDOM.btnDeal);
        this.btnHit = this.getElement(this.elementsOfDOM.btnHit);
        this.btnStand = this.getElement(this.elementsOfDOM.btnStand);
        this.btnDouble = this.getElement(this.elementsOfDOM.btnDouble);
        this.btnBet10 = this.getElement(this.elementsOfDOM.btnBet10);
        this.btnBet100 = this.getElement(this.elementsOfDOM.btnBet100);
        this.btnBet500 = this.getElement(this.elementsOfDOM.btnBet500);
        this.btnClear = this.getElement(this.elementsOfDOM.btnClear);
        this.spnAccountBallance = this.getElement(this.elementsOfDOM.spnAccountBallance);
        this.spnBetAmount = this.getElement(this.elementsOfDOM.spnBetAmount);
        this.smlInGame = this.getElement(this.elementsOfDOM.smlIngame);

        this.result.btnNextRound = this.getElement(this.elementsOfDOM.btnNextRound);
    }

    setupListeners() {
        this.btnDeal.addEventListener("click", () => this.dealCards());

        this.btnBet10.addEventListener("click", () => this.increaseBetAmount(10));
        this.btnBet100.addEventListener("click", () => this.increaseBetAmount(100));
        this.btnBet500.addEventListener("click", () => this.increaseBetAmount(500));
        this.btnClear.addEventListener("click", () => this.clearBetAmount());

        this.btnHit.addEventListener("click", () => this.hitPlayerCard());
        this.btnStand.addEventListener("click", () => this.hitDealerCards());

        this.moveDoubleDownRefer = this.moveDoubleDown.bind(this);
        this.btnDouble.addEventListener("click", this.moveDoubleDownRefer);

        this.result.btnNextRound.addEventListener("click", () => this.startNewRound());
    }

    setStartedSettings() {
        this.lockActionButtons(true);
        this.spnAccountBallance.innerText = this.player.money;
    }

    lockActionButtons(state) {
        this.btnHit.disabled = state;
        this.btnStand.disabled = state;
        this.btnDouble.disabled = state;
    }

    lockBetButtons(state) {
        this.btnClear.disabled = state;
        this.btnBet10.disabled = state;
        this.btnBet100.disabled = state;
        this.btnBet500.disabled = state;
    }

    setupInfo() {
        this.table.dealerCardsArea.innerHTML = "";
        this.table.playerCardsArea.innerHTML = "";
        this.btnDeal.hidden = true;

        this.player.money -= this.betAmount;
        this.spnAccountBallance.innerText = this.player.money;

        if (this.result.spnBlackJackInfo) {
            this.result.spnBlackJackInfo.hidden = true;
        }
    }

    increaseBetAmount(amount) {
        if (this.btnDeal.classList.contains("error")) {
            this.btnDeal.classList.remove("error");
        }

        this.betAmount += amount;
        this.spnBetAmount.innerText = this.betAmount;

        if (this.betAmount > this.player.money) {
            this.betAmount = this.player.money;
            this.spnBetAmount.innerText = this.betAmount;
        }
    }

    clearBetAmount() {
        if (!this.btnDeal.classList.contains("error")) {
            this.btnDeal.classList.add("error");
        }

        this.betAmount = 0;
        this.spnBetAmount.innerText = this.betAmount;
    }

    dealCards() {
        if (!this.betAmount) {
            return;
        }

        this.setupInfo();
        this.deck.shuffle();
        this.smlInGame.hidden = false;

        for (let i = 0; i < 2; i++) {
            let playerCard = this.deck.pickOneCard();
            this.player.hand.addCardToOwned(playerCard);
            this.table.showPlayerCard(playerCard);
        }

        let dealerCard = this.deck.pickOneCard();
        let blankCard = this.deck.createCardBack();
        this.dealer.hand.addCardToOwned(dealerCard);
        this.table.showDealerCard(blankCard);
        this.table.showDealerCard(dealerCard);

        this.updatePoints();

        this.lockActionButtons(false);
        this.lockBetButtons(true);

        if (this.player.money < this.betAmount) {
            this.btnDouble.removeEventListener("click", this.moveDoubleDownRefer);
            this.btnDouble.classList.add("error");
        }
    }

    updatePoints() {
        this.table.spnDealerPoints.innerText = this.dealer.countPoints();
        this.table.spnPlayerPoints.innerText = this.player.countPoints();
    }

    hitPlayerCard() {
        this.btnDouble.classList.add("hide");

        const card = this.deck.pickOneCard();
        this.player.hand.addCardToOwned(card);
        this.table.showPlayerCard(card);
        this.table.spnPlayerPoints.innerText = this.player.countPoints();

        if (this.player.points > WINNING_POINTS) {
            this.whoWins = this.dealer.name;
            this.endRound();
        }
    }

    hitDealerCards() {
        let blankCard = this.table.dealerCardsArea.childNodes[0];
        blankCard.remove();

        while (this.dealer.points <= this.player.points && this.dealer.points < WINNING_POINTS && this.player.points <= WINNING_POINTS) {
            const card = this.deck.pickOneCard();
            this.dealer.hand.addCardToOwned(card);
            this.table.showDealerCard(card);
            this.table.spnDealerPoints.innerText = this.dealer.countPoints();
        }

        this.checkWinner();
        this.checkMoney();
    }

    moveDoubleDown() {
        this.player.money -= this.betAmount;
        this.spnAccountBallance.innerText = this.player.money;
        this.betAmount *= 2;

        this.hitPlayerCard();

        if (this.player.points <= WINNING_POINTS) {
            this.hitDealerCards();
        }
    }

    checkWinner() {
        if (this.dealer.points > WINNING_POINTS) {
            this.whoWins = this.player.name;
        } else if (this.player.points > this.dealer.points) {
            this.whoWins = this.player.name;
        } else if (this.dealer.points > this.player.points) {
            this.whoWins = this.dealer.name;
        } else if (this.player.points <= WINNING_POINTS && this.player.points === this.dealer.points) {
            this.whoWins = this.drawName;
        }

        this.endRound();
    }

    checkMoney() {
        if (!this.player.money) {
            this.result.setEndGame();
        }
    }

    endRound() {
        if (this.btnDouble.classList.contains("hide")) {
            this.btnDouble.classList.remove("hide");
        }

        if (this.btnDouble.classList.contains("error")) {
            this.btnDouble.classList.remove("error");
            this.btnDouble.addEventListener("click", this.moveDoubleDownRefer);
        }

        if (this.player.hand.checkBlackjack() || this.dealer.hand.checkBlackjack()) {
            this.result.spnBlackJackInfo.hidden = false;
        }

        if (this.player.hand.checkBlackjack() && this.whoWins === this.player.name) {
            this.betAmount *= 1.25;
        }

        if (this.whoWins === this.player.name) {
            this.player.money += this.betAmount * 2;
            this.spnAccountBallance.innerText = this.player.money;
            this.dealer.money -= this.betAmount;
        } else if (this.whoWins === this.drawName) {
            this.player.money += this.betAmount;
            this.dealer.money += this.betAmount;
        } else {
            this.dealer.money += this.betAmount;
        }

        this.betAmount = 0;
        this.spnBetAmount.innerText = this.betAmount;
        this.smlInGame.hidden = true;

        this.result.setWinner(this.whoWins);
        this.result.show();
    }

    startNewRound() {
        this.result.hide();
        this.setupInfo();

        this.deck.reset();
        this.deck.init();

        this.lockActionButtons(true);
        this.lockBetButtons(false);
        this.btnDeal.hidden = false;

        this.player.hand = new Hand();
        this.dealer.hand = new Hand();

        this.player.points = 0;
        this.table.spnPlayerPoints.innerText = this.player.points;
        this.dealer.points = 0;
        this.table.spnDealerPoints.innerText = this.dealer.points;

        for (let i = 0; i < 2; i++) {
            this.table.showDealerCard(this.deck.createCardBack());
            this.table.showPlayerCard(this.deck.createCardBack());
        }
    }
}

export const game = new Game();
