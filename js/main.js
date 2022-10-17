console.log("Connected to html file!")

/*----- constants -----*/
const playerOneName = 'Sparky'
const playerOneImage = new Image(200, 150)
playerOneImage.src = 'img/sparky.png'
const playerThreeName = 'Burton'
const playerThreeImage = new Image(200, 150)
playerThreeImage.src = 'img/burton.png'
const playerTwoName = 'Milo'
const playerTwoImage = new Image(200, 150)
playerTwoImage.src = 'img/milo.png'
const playerFourName = 'Lucy'
const playerFourImage = new Image(200, 150)
playerFourImage.src = 'img/lucy.png'

/*----- state variables -----*/
let dealerHand,
    playerHand,
    playerName,
    playerPhoto = new Image(175, 175),
    wagerAmount,
    insurance,
    startingBalance,
    currentBalanceAmt,
    playerBalance,
    winAmount,
    deckLength,
    currentCard;

// let state = {
//     dealerHand: dealerHand,
//     playerHand: playerHand,
//     wager: wagerAmount,
//     playerHand: playerBalance,
// }


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
const playerOne = document.querySelector('#player-one')
const playerTwo = document.querySelector('#player-two')
const playerThree = document.querySelector('#player-three')
const playerFour = document.querySelector('#player-four')

// Player Choices

const startButton = document.querySelector('.start')
const rulesButton = document.querySelector('.rules-button')
const wagerButton = document.querySelector('.wager')
const dealButton = document.querySelector('.deal-button')
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
const playersCards = document.querySelector('#players-cards')
const imageDealer = document.querySelector('.image-dealer')
const playerInfo = document.querySelector('#player-info')
const playerHandInfo = document.querySelector('.player-hand-info')
const imageCardDeck = document.querySelector('.card-deck')
const imagePayOut = document.querySelector('.payout')
const currentBalance = document.getElementById('bal-amt')
const currentWager = document.getElementById('wager-amt')
const currentHandCount = document.getElementById('hand-count')
const enterWager = document.querySelector('.player-enter-wager')
const inputWager = document.getElementById('input-wager')



// Reset Game

/*----- Deck Generator -----*/
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
let suits = ['spades', 'clubs', 'diamonds', 'hearts']
let newDeck = []

console.log(values[12])

function generateCards() {
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let card = values[i] + suits[j]

            newDeck.push(card)
        }
    }
}

function dealRandomCard() {
    // console.log(newDeck[1])
    let card = Math.floor(Math.random() * newDeck.length)
    deckLength = deckLength - 1
    console.log(newDeck[card])
    newDeck.splice(card, 1)
        // console.log(newDeck)
    return newDeck[card]

}

function dealFirstTwoCards() {
    playerHand = dealRandomCard()

    // dealerHand = dealRandomCard()
    // playerHand += dealRandomCard()
    // dealerHand += dealRandomCard()
    console.log(playerHand)
        // console.log(dealerHand)
}


/*----- functions -----*/

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
    addPlayerInfo()
}

function addPlayerInfo() {
    playerOne.innerText = playerOneName
    playerOne.appendChild(playerOneImage)
    playerTwo.innerText = playerTwoName
    playerTwo.appendChild(playerTwoImage)
    playerThree.innerText = playerThreeName
    playerThree.appendChild(playerThreeImage)
    playerFour.innerText = playerFourName
    playerFour.appendChild(playerFourImage)
}

function getPlayerBalance(evt) {
    mainScreen.removeChild(choosePlayer)
    mainScreen.appendChild(balanceAmount)
    playerName = evt.composedPath()
    console.log(playerName)
        // playerName = playerName[1].innerText
        // playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1)
    console.log(playerName)
}

function gameStart(evt) {

    startingBalance = document.querySelector('input')
    startingBalance = startingBalance.value
    console.log(startingBalance)
    goToTheTable()

}

function goToTheTable() {
    mainScreen.removeChild(balanceAmount)
    mainScreen.appendChild(gameTable)
    mainScreen.style.backgroundColor = 'rgb(191, 48, 163)'
    backGround.style.backgroundColor = 'rgb(191, 48, 163)'
    playerPhoto.src = playerName[0].currentSrc
    playerInfo.appendChild(playerPhoto)
    currentBalanceAmt = startingBalance
    currentBalance.innerText = currentBalanceAmt
    generateCards()
}


function init() {
    mainScreen.removeChild(ruleList)
    mainScreen.removeChild(choosePlayer)
    mainScreen.removeChild(balanceAmount)
    mainScreen.removeChild(gameTable)
}

function dealCards() {

    wagerAmount = document.querySelector('input')
    wagerAmount = wagerAmount.value
    currentWager.innerText = wagerAmount
    playersCards.removeChild(enterWager)
    playersCards.removeChild(inputWager)
    playersCards.removeChild(dealButton)
    dealFirstTwoCards()

}



/*----- event listeners -----*/

rulesButton.addEventListener("click", showRules)
backButton.addEventListener("click", handleBack)
startButton.addEventListener("click", start)
letsPlayButton.addEventListener("click", gameStart)
dealButton.addEventListener("click", dealCards)

playerSelected.forEach(function(player) {
    player.addEventListener('click', getPlayerBalance)
})


init()