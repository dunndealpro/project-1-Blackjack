/*----- constants -----*/
const playerOneName = 'Sparky'
const playerOneImage = new Image(200, 150)
playerOneImage.src = 'img/sparky.png'
const playerTwoName = 'Milo'
const playerTwoImage = new Image(200, 150)
playerTwoImage.src = 'img/milo2.png'
const playerThreeName = 'Burton'
const playerThreeImage = new Image(200, 150)
playerThreeImage.src = 'img/burton.png'
const playerFourName = 'Maddie'
const playerFourImage = new Image(200, 150)
playerFourImage.src = 'img/maddie.png'
const playerFiveName = 'Mookie'
const playerFiveImage = new Image(200, 140)
playerFiveImage.src = 'img/mookie.png'
const playerSixName = 'Chunk'
const playerSixImage = new Image(200, 150)
playerSixImage.src = 'img/chunk.png'
const cardBackImg = new Image(150, 100)
cardBackImg.src = 'img/cardimages/blue.svg'

const colorMagenta = 'rgb(191, 48, 163)'
const colorCardTableGreen = 'rgb(177, 154, 24)'
const colorLoseRed = 'rgb(248, 66, 66)'
const colorBackgroundBlue = 'rgb(86, 133, 139)'

/*-----variables -----*/
let dealerHand = [],
    playerHand = [],
    playerHandValue,
    dealerHandValue,
    playerName,
    playerPhoto = new Image(175, 175),
    wagerAmount,
    payOutAmount,
    insurance,
    startingBalance,
    currentBalanceAmt,
    playerBalance,
    winAmount,
    deckLength,
    currentCard,
    playerBust,
    dealerBust,
    dBlackJack,
    pBlackJack,
    gamePush,
    playerWin,
    dealerWin,
    playerResultText,
    dealerResultText;


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
const playerFive = document.querySelector('#player-five')
const playerSix = document.querySelector('#player-six')
const handResults = document.getElementById('hand-results')
const gameOver = document.getElementById('game-over')

// Player Choices
const startButton = document.querySelector('.start')
const rulesButton = document.querySelector('.rules-button')
const wagerButton = document.querySelector('.wager')
const dealButton = document.querySelector('.deal-button')
const hitButton = document.querySelector('#hit-me')
const standButton = document.querySelector('#stand')
const continueButton = document.querySelector('.continue')
const yesButton = document.querySelector('.yes')
const noButton = document.querySelector('.no')
const nextHandButton = document.querySelector('#restart')
const playerSelected = document.querySelectorAll('.player')
const letsPlayButton = document.querySelector('.lets-play')
const exitButton = document.getElementById('exit-quit')
const okButtonOne = document.getElementById('ok-button-1')
const okButtonTwo = document.getElementById('ok-button-2')

// Display Game Info
const dealersCards = document.querySelector('#dealers-cards')
const playersCards = document.querySelector('#players-cards')
const imageDealer = document.querySelector('.image-dealer')
const playerInfo = document.querySelector('#player-info')
const playerHandInfo = document.querySelector('.player-hand-info')
const imageCardDeck = document.querySelector('.small-container-deck')
const imagePayOut = document.querySelector('.payout')
const currentBalance = document.getElementById('bal-amt')
const currentWager = document.getElementById('wager-amt')
const currentHandCount = document.getElementById('hand-count')
const enterWager = document.querySelector('.player-enter-wager')
const inputWager = document.getElementById('input-wager')
const dCardHeader = document.getElementById('dcard-header')
const pCardHeader = document.getElementById('pcard-header')
const insufficientFunds = document.getElementById('insufficient-funds')
const gameplayPlayerCards = document.querySelector('.gameplay-player-cards')
const gameplayDealerCards = document.querySelector('.gameplay-dealer-cards')
const cardDeckInPlay = document.getElementById('card-deck-inplay')


/*----- Deck Generator -----*/
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
let suits = ['s', 'c', 'd', 'h']
let newDeck = []
let numberOfDecks = 4

/*----- functions -----*/

//show rules view
function showRules() {
    mainScreen.removeChild(dealerOne)
    mainScreen.removeChild(rulesButton)
    mainScreen.removeChild(startButton)
    mainScreen.appendChild(ruleList)
}

//to go back to start page
function handleBack() {
    mainScreen.appendChild(dealerOne)
    mainScreen.appendChild(startButton)
    mainScreen.appendChild(rulesButton)
    mainScreen.removeChild(ruleList)
}

//go to choose player view
function start() {
    mainScreen.removeChild(dealerOne)
    mainScreen.removeChild(rulesButton)
    mainScreen.removeChild(startButton)
    mainScreen.appendChild(choosePlayer)
    addPlayerInfo()
}

// add players to selection to view
function addPlayerInfo() {
    playerOne.innerText = playerOneName
    playerOne.appendChild(playerOneImage)
    playerTwo.innerText = playerTwoName
    playerTwo.appendChild(playerTwoImage)
    playerThree.innerText = playerThreeName
    playerThree.appendChild(playerThreeImage)
    playerFour.innerText = playerFourName
    playerFour.appendChild(playerFourImage)
    playerFive.innerText = playerFiveName
    playerFive.appendChild(playerFiveImage)
    playerSix.innerText = playerSixName
    playerSix.appendChild(playerSixImage)
}

// go player starting balance view
function getPlayerBalance(evt) {
    mainScreen.removeChild(choosePlayer)
    mainScreen.appendChild(balanceAmount)
    playerName = evt.composedPath()

}

// stores starting balance and goes to main game view
function gameStart() {
    startingBalance = document.querySelector('input')
    currentBalanceAmt = startingBalance.value
    if (currentBalanceAmt > 0) {
        goToTheTable()
    }
}

// enables the game table
function goToTheTable() {
    mainScreen.removeChild(balanceAmount)
    gameTable.removeChild(handResults)
    gameTable.removeChild(insufficientFunds)
    mainScreen.appendChild(gameTable)
    mainScreen.style.backgroundColor = colorMagenta
    backGround.style.backgroundColor = colorMagenta
    playerPhoto.src = playerName[0].currentSrc
    playerInfo.innerText = playerName[1].innerText
    playerInfo.appendChild(playerPhoto)
    imageCardDeck.appendChild(cardBackImg)
    currentBalance.innerText = currentBalanceAmt
    generateCards()

    exitButton.addEventListener('click', exit)
}

// generate card deck depending on amount of decks being used
function generateCards() {
    for (let k = 0; k < numberOfDecks; k++) {
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < suits.length; j++) {
                let card = values[i] + suits[j]
                newDeck.push(card)
            }
        }
    }
}

//deals random card and removes it from the deck
function dealRandomCard() {
    let card = Math.floor(Math.random() * newDeck.length)
    let newCard = newDeck[card]
    newDeck.splice(card, 1)
    return newCard
}

// gets wager amount and starts hand
function dealCards() {
    wagerAmountTemp = document.querySelector('input')
    wagerAmount = wagerAmountTemp.value
    wagerAmount = parseInt(wagerAmount, 10)
    currentWager.innerText = wagerAmount
    playersCards.removeChild(enterWager)
    playersCards.removeChild(inputWager)
    playersCards.removeChild(dealButton)
    currentBalanceAmt = parseInt(currentBalanceAmt)
    if ((wagerAmount <= currentBalanceAmt) && (wagerAmount > 0)) {
        dealFirstTwoCards()
    } else {
        playersCards.replaceWith(insufficientFunds)
    }
    hitButton.addEventListener('click', hitMe)
    standButton.addEventListener('click', stand)
}

//checks that wage amount is > 0 and <= balance amount
function insufficientBack() {
    currentWager.innerText = 0
    insufficientFunds.replaceWith(playersCards)
    playersCards.appendChild(enterWager)
    playersCards.appendChild(inputWager)
    playersCards.appendChild(dealButton)
    inputWager.value = ''
}

// deals random cards to player and dealer and assigns to their hands as an array
function dealFirstTwoCards() {
    playerHand.push(dealRandomCard())
    dealerHand.push(dealRandomCard())
    playerHand.push(dealRandomCard())
    dealerHand.push(dealRandomCard())
    currentBalanceAmt = currentBalanceAmt - wagerAmount
    currentBalance.innerText = currentBalanceAmt
    determinePlayerHandValue(playerHand)
    determineDealerHandValue(dealerHand)
    upDatePlayerHandValue()
    updatePlayerCards()
    updateDealerCards()
    checkForBlackJack()
}

// checks for winning blackjack
function checkForBlackJack() {
    if (playerHandValue === 21 && dealerHandValue !== 21) {
        tempDownCardImg = document.getElementById('down-card-img')
        gameplayDealerCards.removeChild(tempDownCardImg)
        tempDownCardImg = new Image(150, 100)
        tempDownCardImg.setAttribute('id', 'dealer-new-card-img')
        tempDownCardImg.src = `img/cardimages/${dealerHand[1]}.svg`
        gameplayDealerCards.appendChild(tempDownCardImg)
        pBlackJack = true
        compareHands()

    } else if (playerHandValue === 21 && dealerHandValue === 21) {
        currentBalanceAmt = currentBalanceAmt + payOutAmount
        gamePush = true
        compareHands()
    } else if (playerHandValue !== 21 && dealerHandValue === 21) {
        tempDownCardImg = document.getElementById('down-card-img')
        gameplayDealerCards.removeChild(tempDownCardImg)
        tempDownCardImg = new Image(150, 100)
        tempDownCardImg.setAttribute('id', 'dealer-new-card-img')
        tempDownCardImg.src = `img/cardimages/${dealerHand[1]}.svg`
        gameplayDealerCards.appendChild(tempDownCardImg)
        dBlackJack = true
        compareHands()
    } else {
        dBlackJack = false, pBlackJack = false, gamePush = false
    }
}

// updates dealer cards with card images
function updateDealerCards() {
    let dealerShowCard = document.createElement('div')
    dealerShowCard.setAttribute("class", "dealer-card")
    let tempCardImg = new Image(150, 100)
    tempCardImg.setAttribute('id', 'dealer-new-card-img')
    tempCardImg.src = `img/cardimages/${dealerHand[0]}.svg`
    gameplayDealerCards.appendChild(dealerShowCard)
    gameplayDealerCards.appendChild(tempCardImg)
    let dealerDownCard = document.createElement('div')
    dealerDownCard.setAttribute("id", "down-card")
    dealerDownCard.setAttribute("class", "dealer-card")
    let tempDownCardImg = new Image(150, 100)
    tempDownCardImg.setAttribute('id', 'down-card-img')
    tempDownCardImg.src = 'img/cardimages/blue.svg'
    gameplayDealerCards.appendChild(tempDownCardImg)
}

//updates player cards with card images
function updatePlayerCards() {
    playerTransDist = 0
    i = 0
    playerHand.forEach(function(card) {
        let gameCard = document.createElement('div')
        gameCard = new Image(150, 100)
        gameCard.setAttribute("id", "player-shown-img")
        gameCard.src = `img/cardimages/${playerHand[i]}.svg`
        i++
        gameplayPlayerCards.appendChild(gameCard)
    })
}

//determine player hand value from player's array of cards
function determinePlayerHandValue(hand) {
    tempVal = 0
    hand.forEach(function(value) {
        let cardVal = value.charAt(0)
        if (cardVal === 'A') {
            cardVal = 11
            tempVal += cardVal
        } else if (cardVal === 'J' || cardVal === 'Q' || cardVal === 'K') {
            cardVal = 10
            tempVal += cardVal
        } else if (cardVal === '1') {
            cardVal = 10
            tempVal += cardVal
        } else {
            cardVal = parseInt(cardVal)
            tempVal += cardVal
        }
    })
    let numberOfAces = hand.filter(function(ace) {
        let a = ace.startsWith('A')
        return a
    })
    let amountToDeduct = 10
    if (numberOfAces.length >= 2) {
        amountToDeduct = (numberOfAces.length - 1) * 10
    }
    if (tempVal > 21 && (hand.includes('Ad') || hand.includes('Ah') || hand.includes('Ac') || hand.includes('As'))) {
        tempVal -= amountToDeduct
    }
    playerHandValue = tempVal
}

//determine dealer hand value from dealer's array of cards
function determineDealerHandValue(hand) {
    tempVal = 0
    hand.forEach(function(value) {
        let cardVal = value.charAt(0)
        if (cardVal === 'A') {
            cardVal = 11
            tempVal += cardVal
        } else if (cardVal === 'J' || cardVal === 'Q' || cardVal === 'K') {
            cardVal = 10
            tempVal += cardVal
        } else if (cardVal === '1') {
            cardVal = 10
            tempVal += cardVal
        } else {
            cardVal = parseInt(cardVal)
            tempVal += cardVal
        }
    })
    let numberOfAces = hand.filter(function(ace) {
        let a = ace.startsWith('A')
        return a
    })
    let amountToDeduct = 10
    if (numberOfAces.length >= 2) {
        amountToDeduct = (numberOfAces.length - 1) * 10
    }
    if (tempVal > 21 && (hand.includes('Ad') || hand.includes('Ah') || hand.includes('Ac') || hand.includes('As'))) {
        tempVal -= amountToDeduct
    }
    dealerHandValue = tempVal
}

//updates player hand value display
function upDatePlayerHandValue() {
    currentHandCount.innerText = playerHandValue
}

//deals player hit card
function hitMe() {
    if (dBlackJack !== true && gamePush !== true && pBlackJack !== true) {
        playerHand.push(dealRandomCard())
        determinePlayerHandValue(playerHand)
        upDatePlayerHandValue()
        gameCard = new Image(150, 100)
        gameCard.setAttribute("id", "player-shown-img")
        gameCard.src = `img/cardimages/${playerHand[playerHand.length - 1]}.svg`
        gameplayPlayerCards.appendChild(gameCard)
    }
    if (playerHandValue > 21) {
        playerBust = true
        stand()
    }
}

// deals dealer additional cards if dealer hand is <=16, determine if dealer busts
function stand() {
    tempDownCardImg = document.getElementById('down-card-img')
    gameplayDealerCards.removeChild(tempDownCardImg)
    tempDownCardImg = new Image(150, 100)
    tempDownCardImg.setAttribute('id', 'dealer-new-card-img')
    tempDownCardImg.src = `img/cardimages/${dealerHand[1]}.svg`
    gameplayDealerCards.appendChild(tempDownCardImg)

    while (dealerHandValue <= 16) {
        dealerHand.push(dealRandomCard())
        determineDealerHandValue(dealerHand)
    }
    for (let i = 2; i < dealerHand.length; i++) {

        let dealerNewCardImg = new Image(150, 100)
        dealerNewCardImg.setAttribute('id', 'dealer-new-card-img')
        dealerNewCardImg.src = `img/cardimages/${dealerHand[i]}.svg`
        gameplayDealerCards.appendChild(dealerNewCardImg)
    }
    if (dealerHandValue > 21) {
        dealerBust = true
    } else {
        dealerBust = false
    }

    hitButton.removeEventListener('click', hitMe)
    standButton.removeEventListener('click', stand)
    compareHands()
}

//compares dealer and play hand values and assign win results to be displayed
function compareHands() {
    nextHandButton.addEventListener('click', nextHand)
    if ((playerBust === true && dealerBust !== true) && (dealerHandValue <= 21)) {
        dealerWin = true
        playerResultText = "Player Busts - " + playerHandValue
        dealerResultText = 'Dealer Wins! - ' + dealerHandValue
        displayHandResults()
    }
    if (playerBust === true && dealerBust === true) {
        dealerWin = true
        playerResultText = "Player Busts - " + playerHandValue
        dealerResultText = "Dealer Busts, but still wins!"
        displayHandResults()
    }
    if ((playerBust !== true && dealerBust !== true) && (playerHandValue > dealerHandValue)) {
        payOutAmount = wagerAmount * 2
        currentBalanceAmt = currentBalanceAmt + payOutAmount
        playerWin = true
        playerResultText = 'Player Wins! - ' + playerHandValue
        dealerResultText = "Dealer Loses - " + dealerHandValue
        displayHandResults()
    }
    if ((playerBust !== true && dealerBust !== true) && (playerHandValue < dealerHandValue)) {
        dealerWin = true
        playerResultText = "Player Loses - " + playerHandValue
        dealerResultText = 'Dealer Wins! - ' + dealerHandValue
        displayHandResults()
    }
    if ((playerBust !== true && dealerBust !== true) && (playerHandValue === dealerHandValue)) {
        payOutAmount = wagerAmount * 1
        currentBalanceAmt = currentBalanceAmt + payOutAmount
        gamePush = true
        playerResultText = "Push! - " + playerHandValue
        dealerResultText = "Push! - " + dealerHandValue
        displayHandResults()
    }
    if ((playerBust !== true && dealerBust === true) && (playerHandValue <= 21)) {
        payOutAmount = wagerAmount * 2
        currentBalanceAmt = currentBalanceAmt + payOutAmount
        playerWin = true
        playerResultText = 'Player Wins! - ' + playerHandValue
        dealerResultText = "Dealer Busts - " + dealerHandValue
        displayHandResults()
    }
    if (dBlackJack) {
        dealerWin = true
        playerResultText = "Player Loses"
        dealerResultText = "Dealer has Blackjack"
        displayHandResults()
    }
    if (pBlackJack) {
        playerWin = true
        payOutAmount = wagerAmount * 2.5
        currentBalanceAmt = currentBalanceAmt + payOutAmount
        playerResultText = "BLACKJACK!!"
        dealerResultText = "Dealer Loses"
        displayHandResults()
    }
    nextHandButton.addEventListener('click', nextHand)
    currentBalance.innerText = currentBalanceAmt
}

//displays win results
function displayHandResults() {

    if (dealerWin && dBlackJack) {
        playersCards.style.backgroundColor = colorLoseRed
        dealersCards.style.backgroundColor = 'white'
        dCardHeader.innerText = dealerResultText
        pCardHeader.innerText = playerResultText
    } else if (playerWin && pBlackJack) {
        playersCards.style.backgroundColor = 'white'
        dealersCards.style.backgroundColor = colorLoseRed
        dCardHeader.innerText = dealerResultText
        pCardHeader.innerText = playerResultText
    } else if (dealerWin) {
        playersCards.style.backgroundColor = colorLoseRed
        dealersCards.style.backgroundColor = 'white'
        dCardHeader.innerText = dealerResultText
        pCardHeader.innerText = playerResultText
    } else if (playerWin) {
        playersCards.style.backgroundColor = 'white'
        dealersCards.style.backgroundColor = colorLoseRed
        dCardHeader.innerText = dealerResultText
        pCardHeader.innerText = playerResultText
    } else if (gamePush) {
        dealersCards.style.backgroundColor = 'white'
        playersCards.style.backgroundColor = 'white'
        dCardHeader.innerText = dealerResultText
        pCardHeader.innerText = playerResultText
    }
}

//clears game table and starts next hand
function nextHand() {
    dCardHeader.innerText = 'Dealer Cards'
    pCardHeader.innerText = 'Player Cards'
    dealersCards.style.backgroundColor = colorCardTableGreen
    playersCards.style.backgroundColor = colorCardTableGreen
    dealerShownCards = document.querySelectorAll('#dealer-new-card-img')
    playerShownCards = document.querySelectorAll('#player-shown-img')

    playerShownCards.forEach(function(card) {
        gameplayPlayerCards.removeChild(card)
    })
    dealerShownCards.forEach(function(card) {
        gameplayDealerCards.removeChild(card)
    })
    dealerDownCard = document.getElementById('down-card-img')

    if (document.contains(dealerDownCard)) {
        gameplayDealerCards.removeChild(dealerDownCard)
    }
    playersCards.appendChild(enterWager)
    playersCards.appendChild(inputWager)
    playersCards.appendChild(dealButton)
    currentHandCount.innerText = 'N/A'
    currentWager.innerText = 0

    clearGameInfo()
    nextHandButton.removeEventListener('click', nextHand)

    if (currentBalanceAmt <= 0) {
        mainScreen.removeChild(gameTable)
        mainScreen.appendChild(gameOver)
    }
}

function clearGameInfo() {
    playerHand = []
    dealerHand = []
    playerBust = false
    dealerBust = false
    dPlackJack = null
    dPlackJack = null
    gamePush = null
    playerWin = null
    dealerWin = null
}

//game reset if exit button is clicked
function exit() {
    dCardHeader.innerText = 'Dealer Cards'
    pCardHeader.innerText = 'Player Cards'
    dealersCards.style.backgroundColor = colorCardTableGreen
    playersCards.style.backgroundColor = colorCardTableGreen
    playersCards.appendChild(enterWager)
    playersCards.appendChild(inputWager)
    playersCards.appendChild(dealButton)
    gameTable.appendChild(handResults)
    gameTable.appendChild(insufficientFunds)
    dealerShownCards = document.querySelectorAll('#dealer-new-card-img')
    playerShownCards = document.querySelectorAll('#player-shown-img')
    dealerDownCard = document.getElementById('down-card-img')
    if (document.contains(dealerDownCard)) {
        gameplayDealerCards.removeChild(dealerDownCard)
    }

    playerShownCards.forEach(function(card) {
        gameplayPlayerCards.removeChild(card)
    })
    dealerShownCards.forEach(function(card) {
        gameplayDealerCards.removeChild(card)
    })
    mainScreen.removeChild(gameTable)
    mainScreen.appendChild(dealerOne)
    mainScreen.appendChild(startButton)
    mainScreen.appendChild(rulesButton)
    mainScreen.style.backgroundColor = colorBackgroundBlue
    backGround.style.backgroundColor = colorCardTableGreen
    currentHandCount.innerText = 'N/A'
    currentWager.innerText = 0
    inputWager.value = ''
    startingBalance.value = ''

    clearGameInfo()
}

//game reset if player loses all their money
function exitOver() {
    dCardHeader.innerText = 'Dealer Cards'
    pCardHeader.innerText = 'Player Cards'
    dealersCards.style.backgroundColor = colorCardTableGreen
    playersCards.style.backgroundColor = colorCardTableGreen
    playersCards.appendChild(enterWager)
    playersCards.appendChild(inputWager)
    playersCards.appendChild(dealButton)
    gameTable.appendChild(handResults)
    gameTable.appendChild(insufficientFunds)
    dealerShownCards = document.querySelectorAll('#dealer-new-card-img')
    playerShownCards = document.querySelectorAll('#player-shown-img')
    dealerDownCard = document.getElementById('down-card-img')
    if (document.contains(dealerDownCard)) {
        gameplayDealerCards.removeChild(dealerDownCard)
    }

    playerShownCards.forEach(function(card) {
        gameplayPlayerCards.removeChild(card)
    })
    dealerShownCards.forEach(function(card) {
        gameplayDealerCards.removeChild(card)
    })
    mainScreen.removeChild(gameOver)
    mainScreen.appendChild(dealerOne)
    mainScreen.appendChild(dealerOne)
    mainScreen.appendChild(startButton)
    mainScreen.appendChild(ruleList)
    mainScreen.appendChild(choosePlayer)
    mainScreen.appendChild(balanceAmount)
    mainScreen.appendChild(gameTable)
    mainScreen.appendChild(gameOver)
    mainScreen.appendChild(rulesButton)
    dealerDownCard = document.getElementById('down-card-img')
    if (dealerDownCard === true) {
        gameplayDealerCards.removeChild(dealerDownCard)
    }

    mainScreen.style.backgroundColor = colorBackgroundBlue
    backGround.style.backgroundColor = colorCardTableGreen
    currentHandCount.innerText = 'N/A'
    currentWager.innerText = 0
    inputWager.value = ''
    startingBalance.value = ''

    clearGameInfo()

    init()
}

/*----- event listeners -----*/

rulesButton.addEventListener("click", showRules)
backButton.addEventListener("click", handleBack)
startButton.addEventListener("click", start)
letsPlayButton.addEventListener("click", gameStart)
dealButton.addEventListener("click", dealCards)
okButtonOne.addEventListener('click', insufficientBack)
okButtonTwo.addEventListener('click', exitOver)

playerSelected.forEach(function(player) {
    player.addEventListener('click', getPlayerBalance)
})

function init() {
    mainScreen.removeChild(ruleList)
    mainScreen.removeChild(choosePlayer)
    mainScreen.removeChild(balanceAmount)
    mainScreen.removeChild(gameTable)
    mainScreen.removeChild(gameOver)
}

init()