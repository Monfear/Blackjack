export class Common {
    elementsOfDOM = {
        dealerCardsArea: "[data-dealer-cards]",
        playerCardsArea: "[data-player-cards]",
        btnDeal: "[data-btn-deal]",
        btnHit: "[data-btn-hit]",
        btnStand: "[data-btn-stand]",
        btnDouble: "[data-btn-double]",
        btnBet10: "[data-btn-bet10]",
        btnBet100: "[data-btn-bet100]",
        btnBet500: "[data-btn-bet500]",
        btnClear: "[data-btn-clear]",
        btnNextRound: "[data-btn-next-round]",
        spnAccountBallance: "[data-account-ballance]",
        spnBetAmount: "[data-bet-amount]",
        spnDealerPoints: "[data-dealer-points]",
        spnPlayerPoints: "[data-player-points]",
        spnBlackjackInfo: "[data-bj-info]",
        divModalResult: "[data-modal-result]",
        spnPlayerName: "[data-player-name]",
        smlIngame: "[data-ingame]",
    };

    getElement(selector) {
        const elementDOM = document.querySelector(selector);

        if (!elementDOM) {
            throw new Error(`Item not found: ${selector}`);
        }

        return elementDOM;
    }
}
