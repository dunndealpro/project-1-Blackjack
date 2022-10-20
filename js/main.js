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
console.log(playersCards)
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
console.log(gameplayPlayerCards)
    // const playerCardTotal = document.getElementById('#player-card-total')

// Reset Game

/*----- Deck Generator -----*/
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
let suits = ['s', 'c', 'd', 'h']
let newDeck = []

console.log(values[12])


/*----- functions -----*/

function showRules() {
    mainScreen.removeChild(dealerOne)
    mainScreen.removeChild(rulesButton)
    mainScreen.removeChild(startButton)
    mainScreen.appendChild(ruleList)
}

function handleBack() {
    mainScreen.appendChild(dealerOne)
    mainScreen.appendChild(startButton)
    mainScreen.appendChild(rulesButton)
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
        // console.log(playerName)
        // playerName = playerName[1].innerText
        // playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1)
        // console.log(playerName)
}

function gameStart() {

    startingBalance = document.querySelector('input')
    currentBalanceAmt = startingBalance.value
    console.log(startingBalance)
    goToTheTable()

}

function goToTheTable() {
    mainScreen.removeChild(balanceAmount)
    gameTable.removeChild(handResults)
    gameTable.removeChild(insufficientFunds)
    mainScreen.appendChild(gameTable)
    mainScreen.style.backgroundColor = 'rgb(191, 48, 163)'
    backGround.style.backgroundColor = 'rgb(191, 48, 163)'
    playerPhoto.src = playerName[0].currentSrc
    playerInfo.appendChild(playerPhoto)
        // imageCardDeck.classList.add('card', 'small-container-deck')
    imageCardDeck.appendChild(cardBackImg)

    // cardDeckInPlay.appendChild(cardBackImg)
    // currentBalanceAmt = startingBalance
    currentBalance.innerText = currentBalanceAmt
    generateCards()
}

function generateCards() {
    let numberOfDecks = 4
    for (let k = 0; k < numberOfDecks; k++) {
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < suits.length; j++) {
                let card = values[i] + suits[j]
                newDeck.push(card)
            }
        }
    }
}

function dealRandomCard() {
    let card = Math.floor(Math.random() * newDeck.length)
        // console.log(newDeck[card]) // to see the card being dealt
    let newCard = newDeck[card]
    newDeck.splice(card, 1)
        // console.log(newDeck) // to check that the card has been removed
    return newCard
}

function dealCards() {
    wagerAmount = document.querySelector('input')
    wagerAmount = wagerAmount.value
    currentWager.innerText = wagerAmount
    playersCards.removeChild(enterWager)
    playersCards.removeChild(inputWager)
    playersCards.removeChild(dealButton)
    wagerAmount = parseInt(wagerAmount)
    currentBalanceAmt = parseInt(currentBalanceAmt)
    console.log(typeof wagerAmount)
    console.log(typeof currentBalanceAmt)
    console.log(currentBalanceAmt - wagerAmount)
    if ((wagerAmount <= currentBalanceAmt) && (wagerAmount > 0)) {
        dealFirstTwoCards()
    } else {

        playersCards.replaceWith(insufficientFunds)
            // gameTable.removeChild(playersCards)
            // gameTable.appendChild(insufficientFunds)
    }
}

function insufficientBack() {
    //these lines add to remove notification if wagerAmt is larger than current balance
    // playersCards.removeChild(removeNotification)
    currentWager.innerText = 0
    insufficientFunds.replaceWith(playersCards)
        // gameTable.removeChild(insufficientFunds)
        // gameTable.appendChild(playersCards)
    playersCards.appendChild(enterWager)
    playersCards.appendChild(inputWager)
    playersCards.appendChild(dealButton)
    inputWager.value = null

}

function dealFirstTwoCards() {
    playerHand.push(dealRandomCard())
    dealerHand.push(dealRandomCard())
    playerHand.push(dealRandomCard())
    dealerHand.push(dealRandomCard())
    currentBalanceAmt = currentBalanceAmt - wagerAmount
    currentBalance.innerText = currentBalanceAmt
        // playerHand = dealRandomCard()
        // console.log(playerHand)
        // dealerHand = dealRandomCard()
        // console.log(dealerHand)
        // playerHand += dealRandomCard()
        // dealerHand += dealRandomCard()
    console.log('Player Hand = ' + playerHand) // does not match the card logged in the dealRandomCard function
    console.log('Dealer Hand = ' + dealerHand) // does not match the card logged in the dealRandomCard function
        // console.log(newDeck) // does not match the newDeck logged in the last dealRandomCard function
    determinePlayerHandValue(playerHand)
    determineDealerHandValue(dealerHand)
    upDatePlayerHandValue()
    updatePlayerCards()
    updateDealerCards()
    checkForBlackJack()
}

function checkForBlackJack() {
    if (playerHandValue === 21 && dealerHandValue !== 21) {
        // console.log('player wins!')
        // payOutAmount = 2.5 * wagerAmount
        // console.log(payOutAmount)
        // currentBalanceAmt = currentBalanceAmt + payOutAmount
        dealerDownCard = document.getElementById('down-card')
        dealerDownCard.textContent = dealerHand[1]
        pBlackJack = true
        compareHands()

    } else if (playerHandValue === 21 && dealerHandValue === 21) {
        console.log("Hand is a push")
            // payOutAmount = wagerAmount
        currentBalanceAmt = currentBalanceAmt + payOutAmount
        gamePush = true
        compareHands()
    } else if (playerHandValue !== 21 && dealerHandValue === 21) {
        console.log('Dealer has BlackJack')
        dBlackJack = true
        compareHands()
    } else {
        console.log('no black jack')
        dBlackJack = false, pBlackJack = false, gamePush = false

    }
    // setTimeout(nextHand(), 2000)
}

function updateDealerCards() {
    let dealerShowCard = document.createElement('div')
    dealerShowCard.setAttribute("class", "dealer-card")
    console.log(dealerHand[0])
    let tempCardImg = new Image(150, 100)
    tempCardImg.setAttribute('id', 'dealer-new-card-img')
    tempCardImg.src = `/img/cardimages/${dealerHand[0]}.svg`
        // dealerShowCard.textContent = dealerHand[0]
    gameplayDealerCards.appendChild(dealerShowCard)
    gameplayDealerCards.appendChild(tempCardImg)
    let dealerDownCard = document.createElement('div')
    dealerDownCard.setAttribute("id", "down-card")
    dealerDownCard.setAttribute("class", "dealer-card")
    let tempDownCardImg = new Image(150, 100)
    tempDownCardImg.setAttribute('id', 'down-card-img')
    tempDownCardImg.src = '/img/cardimages/blue.svg'
        // tempDownCardImg.style.transform = 'translatex(-50px)'
        // gameplayDealerCards.appendChild(dealerDownCard)
    gameplayDealerCards.appendChild(tempDownCardImg)
}

function updatePlayerCards() {
    playerTransDist = 0
    i = 0
    playerHand.forEach(function(card) {
        let gameCard = document.createElement('div')
        gameCard = new Image(150, 100)
        gameCard.setAttribute("id", "player-shown-img")
        console.log(card)
        gameCard.src = `/img/cardimages/${playerHand[i]}.svg`
            // gameCard.style.transform = 'translateX(-' + playerTransDist + 'px)'
            // playerTransDist += 80
        i++
        gameplayPlayerCards.appendChild(gameCard)
            // console.log(card)
    })
}

function determinePlayerHandValue(hand) {

    tempVal = 0
    hand.forEach(function(value) {

        let cardVal = value.charAt(0)
        if (cardVal === 'A') {
            // cardVal = cardVal.parseInt()
            cardVal = 11
            tempVal += cardVal
        } else if (cardVal === 'J' || cardVal === 'Q' || cardVal === 'K') {
            // cardVal = cardVal.parseInt()
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
    if (tempVal > 21 && (hand.includes('Adiamonds') || hand.includes('Ahearts') || hand.includes('Aclubs') || hand.includes('Aspades'))) {
        tempVal -= amountToDeduct
    }
    playerHandValue = tempVal
        // console.log(numberOfAces)
        // console.log(numberOfAces.length)
    console.log('Player hand value = ' + tempVal)
        // console.log('remaining cards in deck: ' + newDeck.length)
        // return playerHandValue = tempVal
}

function determineDealerHandValue(hand) {

    tempVal = 0
    hand.forEach(function(value) {

        let cardVal = value.charAt(0)
        if (cardVal === 'A') {
            // cardVal = cardVal.parseInt()
            cardVal = 11
            tempVal += cardVal
        } else if (cardVal === 'J' || cardVal === 'Q' || cardVal === 'K') {
            // cardVal = cardVal.parseInt()
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
    if (tempVal > 21 && (hand.includes('Adiamonds') || hand.includes('Ahearts') || hand.includes('Aclubs') || hand.includes('Aspades'))) {
        tempVal -= amountToDeduct
    }
    dealerHandValue = tempVal
        // console.log(numberOfAces)
        // console.log(numberOfAces.length)
        // console.log('dealer hand value = ' + tempVal)
        // console.log('remaining cards in deck: ' + newDeck.length)
        // return dealerHandValue = tempVal
    console.log('Dealer hand Value = ' + dealerHandValue)
}

function upDatePlayerHandValue() {
    // console.log(playerHandValue)
    currentHandCount.innerText = playerHandValue
}

function hitMe() {
    playerTransDist = 160
    if (dBlackJack !== true && gamePush !== true && pBlackJack !== true) {
        playerHand.push(dealRandomCard())
        console.log('Player Hand = ' + playerHand)
        determinePlayerHandValue(playerHand)
        upDatePlayerHandValue()
        gameCard = new Image(150, 100)
        gameCard.setAttribute("id", "player-shown-img")
        gameCard.src = `/img/cardimages/${playerHand[playerHand.length - 1]}.svg`
            // gameCard.textContent = playerHand[playerHand.length - 1]
            // gameCard.style.transform = 'translateX(-' + playerTransDist + 'px)'
            // playerTransDist += 80
        gameplayPlayerCards.appendChild(gameCard)
    }
    if (playerHandValue > 21) {
        console.log('Player Busted!')
        playerBust = true
        console.log(playerBust)
        stand()
    }
}

function stand() {
    console.log('stand function invoked')
        // dealerDownCard = document.getElementById('down-card')
        // dealerDownCard.textContent = dealerHand[1]
    tempDownCardImg = document.getElementById('down-card-img')
    gameplayDealerCards.removeChild(tempDownCardImg)
    tempDownCardImg = new Image(150, 100)
    tempDownCardImg.setAttribute('id', 'dealer-new-card-img')
    tempDownCardImg.src = `/img/cardimages/${dealerHand[1]}.svg`
        // tempDownCardImg.style.transform = 'translateX(-50px)'
    gameplayDealerCards.appendChild(tempDownCardImg)


    // give more cards to dealer until dealer gets at least 16
    while (dealerHandValue <= 16) {
        dealerHand.push(dealRandomCard())
        console.log('dealer gets card')
        console.log(dealerHand)
        determineDealerHandValue(dealerHand)
    }
    // let transformDist = 100

    for (let i = 2; i < dealerHand.length; i++) {

        let dealerNewCardImg = new Image(150, 100)
        dealerNewCardImg.setAttribute('id', 'dealer-new-card-img')
        dealerNewCardImg.src = `/img/cardimages/${dealerHand[i]}.svg`
            // dealerNewCardImg.style.transform = "translateX(-" + transformDist + "px)"
        gameplayDealerCards.appendChild(dealerNewCardImg)
            // transformDist += 50
            // setTimeout(() => {
            //     dealersCards.appendChild(dealerNewCard)
            //     console.log('card should be shown')
            // }, 1000);
    }
    if (dealerHandValue > 21) {
        console.log('dealer bust')
        dealerBust = true
    } else {
        dealerBust = false
    }
    console.log('prepare to compare')
    compareHands()
        // setTimeout(compareHands, 5000)
}

function compareHands() {
    console.log('compare starts')

    if ((playerBust === true && dealerBust !== true) && (dealerHandValue <= 21)) {
        console.log('Dealer Wins')
        dealerWin = true
        playerResultText = "Player Busts"
        dealerResultText = "Dealer Wins!"
        displayHandResults()
            // nextHand()
    }
    if (playerBust === true && dealerBust === true) {
        console.log('Dealer Wins')
        dealerWin = true
        playerResultText = "Player Busts"
        dealerResultText = "Dealer Busts, but still wins!"
        displayHandResults()
            // nextHand()
    }
    if ((playerBust !== true && dealerBust !== true) && (playerHandValue > dealerHandValue)) {
        console.log('player wins!')
        payOutAmount = wagerAmount * 2
        currentBalanceAmt = currentBalanceAmt + payOutAmount
        playerWin = true
        playerResultText = "Player Wins!"
        dealerResultText = "Dealer Loses"
        displayHandResults()
            // nextHand()
    }
    if ((playerBust !== true && dealerBust !== true) && (playerHandValue < dealerHandValue)) {

        console.log('dealer wins!')
        dealerWin = true
        playerResultText = "Player Loses"
        dealerResultText = "Dealer Wins!"
        displayHandResults()
            // nextHand()
    }
    if ((playerBust !== true && dealerBust !== true) && (playerHandValue === dealerHandValue)) {
        console.log('game is a push')
        payOutAmount = wagerAmount * 1
        currentBalanceAmt = currentBalanceAmt + payOutAmount
        gamePush = true
        playerResultText = "Push!"
        dealerResultText = "Push!"
        displayHandResults()
            // nextHand()
    }
    if ((playerBust !== true && dealerBust === true) && (playerHandValue <= 21)) {
        console.log('player wins!')
        payOutAmount = wagerAmount * 2
        currentBalanceAmt = currentBalanceAmt + payOutAmount
        playerWin = true
        playerResultText = "Player Wins!"
        dealerResultText = "Dealer Busts"
        displayHandResults()
            // nextHand()
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

    currentBalance.innerText = currentBalanceAmt
}

function displayHandResults() {
    console.log('display results invoked')
    console.log(playerWin)
    console.log(dealerWin)

    if (dealerWin && dBlackJack) {
        playersCards.style.backgroundColor = 'rgb(248, 66, 66)'
        dealersCards.style.backgroundColor = 'white'
        dCardHeader.innerText = dealerResultText
        pCardHeader.innerText = playerResultText
    } else if (playerWin && pBlackJack) {
        console.log('player wins')
        playersCards.style.backgroundColor = 'white'
        dealersCards.style.backgroundColor = 'rgb(248, 66, 66)'
        dCardHeader.innerText = dealerResultText
        pCardHeader.innerText = playerResultText
    } else if (dealerWin) {
        console.log('dealer wins')
        playersCards.style.backgroundColor = 'rgb(248, 66, 66)'
        dealersCards.style.backgroundColor = 'white'
        dCardHeader.innerText = dealerResultText
        pCardHeader.innerText = playerResultText
    } else if (playerWin) {
        console.log('player wins')
        playersCards.style.backgroundColor = 'white'
        dealersCards.style.backgroundColor = 'rgb(248, 66, 66)'
        dCardHeader.innerText = dealerResultText
        pCardHeader.innerText = playerResultText
    } else if (gamePush) {
        console.log('push')
        dealersCards.style.backgroundColor = 'white'
        playersCards.style.backgroundColor = 'white'
        dCardHeader.innerText = dealerResultText
        pCardHeader.innerText = playerResultText
    }

}
// 

function nextHand() {
    dCardHeader.innerText = 'Dealer Cards'
    pCardHeader.innerText = 'Player Cards'
    dealersCards.style.backgroundColor = 'rgb(177, 154, 24)'
    playersCards.style.backgroundColor = 'rgb(177, 154, 24)'
        // removeNotification = document.getElementById('notification') //these lines add to remove notification if wagerAmt is larger than current balance
        // playersCards.removeChild(removeNotification)
    dealerShownCards = document.querySelectorAll('#dealer-new-card-img')
    playerShownCards = document.querySelectorAll('#player-shown-img')
        // console.log(playerShownCards)
    playerShownCards.forEach(function(card) {
        gameplayPlayerCards.removeChild(card)
    })
    dealerShownCards.forEach(function(card) {
        gameplayDealerCards.removeChild(card)
    })

    dealerDownCard = document.getElementById('down-card-img')

    if (dealerDownCard === true) {

        gameplayDealerCards.removeChild(dealerDownCard)
    }
    playersCards.appendChild(enterWager)
    playersCards.appendChild(inputWager)
    playersCards.appendChild(dealButton)
        // inputWager.value = null
    currentHandCount.innerText = 'N/A'
    currentWager.innerText = 0
    playerHand = []
    dealerHand = []
    playerBust = false
    dealerBust = false
    dPlackJack = null
    dPlackJack = null
    gamePush = null
    playerWin = null
    dealerWin = null
    if (currentBalanceAmt <= 0) {

        mainScreen.removeChild(gameTable)
        mainScreen.appendChild(gameOver)
            // exit()
    }
}

/*----- event listeners -----*/

rulesButton.addEventListener("click", showRules)
backButton.addEventListener("click", handleBack)
startButton.addEventListener("click", start)
letsPlayButton.addEventListener("click", gameStart)
dealButton.addEventListener("click", dealCards)
hitButton.addEventListener('click', hitMe)
standButton.addEventListener('click', stand)
nextHandButton.addEventListener('click', nextHand)
exitButton.addEventListener('click', exit)
okButtonOne.addEventListener('click', insufficientBack)
okButtonTwo.addEventListener('click', exitOver)

playerSelected.forEach(function(player) {
    player.addEventListener('click', getPlayerBalance)
})

function exit() {
    dCardHeader.innerText = 'Dealer Cards'
    pCardHeader.innerText = 'Player Cards'
    dealersCards.style.backgroundColor = 'rgb(177, 154, 24)'
    playersCards.style.backgroundColor = 'rgb(177, 154, 24)'
    playersCards.appendChild(enterWager)
    playersCards.appendChild(inputWager)
    playersCards.appendChild(dealButton)
    gameTable.appendChild(handResults)
    gameTable.appendChild(insufficientFunds)
        // dealerShownCards = document.querySelectorAll('.dealer-card')
        // playerShownCards = document.querySelectorAll('#player-shown')
    dealerShownCards = document.querySelectorAll('#dealer-new-card-img')
    playerShownCards = document.querySelectorAll('#player-shown-img')
    dealerDownCard = document.getElementById('down-card-img')
    console.log(dealerDownCard)
        // dealersCards.removeChild(dealerDownCard)
    if (document.contains(dealerDownCard)) {

        gameplayDealerCards.removeChild(dealerDownCard)
    }
    // console.log(playerShownCards)
    // playerShownCards.forEach(function(card) {
    //     gameplayPlayerCards.removeChild(card)
    // })
    // dealerShownCards.forEach(function(card) {
    //     gameplayDealerCards.removeChild(card)
    // })
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
    mainScreen.style.backgroundColor = 'rgb(86, 133, 139)'
    backGround.style.backgroundColor = 'rgb(177, 154, 24)'
    currentHandCount.innerText = 'N/A'
    currentWager.innerText = 0
    inputWager.value = null
    startingBalance.value = null
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

function exitOver() {
    dCardHeader.innerText = 'Dealer Cards'
    pCardHeader.innerText = 'Player Cards'
    dealersCards.style.backgroundColor = 'rgb(177, 154, 24)'
    playersCards.style.backgroundColor = 'rgb(177, 154, 24)'
    playersCards.appendChild(enterWager)
    playersCards.appendChild(inputWager)
    playersCards.appendChild(dealButton)
    gameTable.appendChild(handResults)
    gameTable.appendChild(insufficientFunds)
        // dealerShownCards = document.querySelectorAll('.dealer-card')
        // playerShownCards = document.querySelectorAll('#player-shown')
        // console.log(playerShownCards)
        // playerShownCards.forEach(function(card) {
        //     gameplayPlayerCards.removeChild(card)
        // })
        // dealerShownCards.forEach(function(card) {
        //     gameplayDealerCards.removeChild(card)
        // })
    dealerShownCards = document.querySelectorAll('#dealer-new-card-img')
    playerShownCards = document.querySelectorAll('#player-shown-img')
    dealerDownCard = document.getElementById('down-card-img')
    console.log(dealerDownCard)
        // dealersCards.removeChild(dealerDownCard)
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
        // mainScreen.appendChild(gameTable)
    mainScreen.appendChild(dealerOne)
        // mainScreen.appendChild(rulesButton)
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
    // gameplayDealerCards.removeChild(dealerDownCard)
    mainScreen.style.backgroundColor = 'rgb(86, 133, 139)'
    backGround.style.backgroundColor = 'rgb(177, 154, 24)'
    currentHandCount.innerText = 'N/A'
    currentWager.innerText = 0
    inputWager.value = null
    startingBalance.value = null
    playerHand = []
    dealerHand = []
    playerBust = false
    dealerBust = false
    dPlackJack = null
    dPlackJack = null
    gamePush = null
    playerWin = null
    dealerWin = null
    init()
}

function init() {
    mainScreen.removeChild(ruleList)
    mainScreen.removeChild(choosePlayer)
    mainScreen.removeChild(balanceAmount)
    mainScreen.removeChild(gameTable)
    mainScreen.removeChild(gameOver)

}

init()

/*-----Card Images-----*/
// const playerOneImage = new Image(200, 150)
// playerOneImage.src = 'img/sparky.png'


const cardBackImg = new Image(150, 100)
cardBackImg.src = 'img/cardimages/blue.svg'

const cardFrontImg = new Image(150, 100)