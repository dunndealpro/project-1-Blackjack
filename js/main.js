console.log("Connected to html file!")

/*----- constants -----*/


/*----- state variables -----*/
let dealerHand,
    playerHand,
    playerName,
    playerPhoto,
    wagerAmount,
    insurance,
    startingBalance,
    playerBalance,
    winAmount;


let state = {
    dealerHand: dealerHand,
    playerHand: playerHand,
    wager: wagerAmount,
    playerHand: playerBalance,
}


/*----- cached elements  -----*/
// Opening View 
const mainScreen = document.querySelector('.main')
const dealerOne = document.querySelector('.dealer-one')
const ruleList = document.querySelector('#rules-list')
const backButton = document.querySelector('back-button')



// Player Choices

const startButton = document.querySelector('.start')
const rulesButton = document.querySelector('.rules-button')
const wagerButton = document.querySelector('.wager')
const dealButton = document.querySelector('.deal')
const hitButton = document.querySelector('.hit')
const standButton = document.querySelector('.stand')
const continueButton = document.querySelector('.continue')
const yesButton = document.querySelector('.yes')
const noButton = document.querySelector('.no')
const restartButton = document.querySelector('.restart')

// Display Game Info
const dealersCards = document.querySelector('.dealers-cards')
const playersCards = document.querySelector('.players-cards')
const imageDealer = document.querySelector('.image-dealer')
const imagePlayer = document.querySelector('.image-player')
const playerHandInfo = document.querySelector('.player-hand-info')
const imageCardDeck = document.querySelector('.card-deck')
const imagePayOut = document.querySelector('.payout')


// Reset Game


/*----- event listeners -----*/

function showRules(evt) {
    console.log('did this click work?')
    mainScreen.removeChild(dealerOne)
    mainScreen.removeChild(rulesButton)
    mainScreen.removeChild(startButton)
    mainScreen.appendChild(ruleList)


}

function handleBack() {
    init()
}


/*----- functions -----*/
rulesButton.addEventListener("click", showRules)



function init() {

    mainScreen.removeChild(ruleList)
}

init()