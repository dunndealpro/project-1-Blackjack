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
// Game Views
const backGround = document.querySelector('body')
const mainScreen = document.querySelector('.main')
const dealerOne = document.querySelector('.dealer-one')
const ruleList = document.querySelector('.rules-list')
const backButton = document.querySelector('.back-button', '.rules-list')
const choosePlayer = document.querySelector('.start-page')
const balanceAmount = document.querySelector('.balance-amount')
const gameTable = document.querySelector('.game-table')

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
const playerSelected = document.querySelectorAll('.player')
const letsPlayButton = document.querySelector('.lets-play')




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

function showRules() {
    mainScreen.removeChild(dealerOne)
    mainScreen.removeChild(rulesButton)
    mainScreen.removeChild(startButton)
    mainScreen.appendChild(ruleList)
}

function handleBack() {
    mainScreen.appendChild(dealerOne)
    mainScreen.appendChild(rulesButton)
    mainScreen.appendChild(startButton)
    mainScreen.removeChild(ruleList)
}

function start() {
    mainScreen.removeChild(dealerOne)
    mainScreen.removeChild(rulesButton)
    mainScreen.removeChild(startButton)
    mainScreen.appendChild(choosePlayer)
}

function getPlayerBalance(evt) {
    mainScreen.removeChild(choosePlayer)
    mainScreen.appendChild(balanceAmount)
    playerName = evt.composedPath()
    playerName = playerName[1].id
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1)
    console.log(playerName)
}

function gameStart(evt) {

    startingBalance = document.querySelector('input')
    startingBalance = startingBalance.value
    goToTheTable()

}


function goToTheTable() {

    mainScreen.removeChild(balanceAmount)
    mainScreen.appendChild(gameTable)
    mainScreen.style.backgroundColor = 'rgb(191, 48, 163)'
    backGround.style.backgroundColor = 'rgb(191, 48, 163)'



}

/*----- functions -----*/
rulesButton.addEventListener("click", showRules)
backButton.addEventListener("click", handleBack)
startButton.addEventListener("click", start)
letsPlayButton.addEventListener("click", gameStart)

playerSelected.forEach(function(player) {
    player.addEventListener('click', getPlayerBalance)
})


function init() {

    mainScreen.removeChild(ruleList)
    mainScreen.removeChild(choosePlayer)
    mainScreen.removeChild(balanceAmount)
    mainScreen.removeChild(gameTable)
}

init()