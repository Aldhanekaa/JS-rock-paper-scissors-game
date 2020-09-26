const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const rock = document.querySelector('#rock');
const choices = document.querySelectorAll('.choice');
const modal = document.querySelector('.modal');
const resetBtn = document.querySelector('.restart-btn');
const score = document.querySelector('#score');
let scoreBoard = {
    "player": 0,
    "computer": 0
}

choices.forEach(e => {
    e.addEventListener('click', play)
})
function play() {
    const winStatus = checkWin();
    if (winStatus == 'computer win' || winStatus == 'player win') {
        resetBtn.style.display = 'inline';
        choices.forEach(e => {
            e.classList.add('notAllowed')
        })
    } else {
        resetBtn.style.display = 'none';
        const playerChoice = getPlayerChoice(this);
        const computerChoice = getComputerChoice();
        const result = getResult(playerChoice, computerChoice);
        const modalContent = getModalContent(result)
        showModal(modalContent)
        showScore();

        // console.log(modalContent)
        // console.log(result)
        // console.log(playerChoice)
    }
}
resetBtn.addEventListener('click', reset)
function reset() {
    scoreBoard = {
        "player": 0,
        "computer": 0
    }
    showScore()
    this.style.display = 'none';
    choices.forEach(e => {
        e.classList.remove('notAllowed');
    })
}
function getPlayerChoice(element) {
    if (element == rock)
        return 'rock';
    else if (element == scissors)
        return "scissors";
    else return 'paper';
}

function getComputerChoice() {
    const random = Math.round(Math.random() * (15 - 1));
    if (random >= 0 && random <= 5)
        return 'paper';
    else if (random > 5 && random <= 10)
        return 'scissors';
    else return 'rock'
}

function getResult(pC, cC) {
    if (pC == cC) {
        return {
            "status": "Draw!",
            "choices": {
                "playerChoice": pC,
                "computerChoice": cC
            },
            "textColor": "",
            "win": ''
        }
    } else if ((pC == 'scissors' && cC == 'paper') || (pC == 'paper' && cC == 'rock') || (pC == 'rock' && cC == 'scissors')) {
        scoreBoard.player++;

        return {
            "status": "You Win!",
            "choices": {
                "playerChoice": pC,
                "computerChoice": cC
            },
            "textColor": "text-win",
            "win": "player"
        }
    } else {
        scoreBoard.computer++;
        return {
            "status": "You Lose!",
            "choices": {
                "playerChoice": pC,
                "computerChoice": cC
            },
            "textColor": "text-lose",
            "win": "computer"
        }
    }
}

function getModalContent(obj) {
    const {
        status,
        choices,
        textColor
    } = obj;
    const winStatus = checkWin()
    if (winStatus == 'computer win') {
        return `
        <h1 class="text-lose">${status}</h1>
        <i class="fas fa-frown-open fa-10x"></i>
            <p>Computer Choose <strong>${choices.computerChoice.charAt(0).toUpperCase() +
            choices.computerChoice.slice(1)}</strong></p>
        `
    } else if (winStatus == 'player win') {
        return `
        <h1 ${textColor !== '' ? `class="${textColor}"` : ''}>${status}</h1>
        <i class="fas fa-award fa-10x"></i>
            <p>Computer Choose <strong>${choices.computerChoice.charAt(0).toUpperCase() +
            choices.computerChoice.slice(1)}</strong></p>
        `
    } else {
        return `
        <h1 ${textColor !== '' ? `class="${textColor}"` : ''}>${status}</h1>
            <i class="fas fa-hand-${choices.computerChoice} fa-10x"></i>
            <p>Computer Choose <strong>${choices.computerChoice.charAt(0).toUpperCase() +
            choices.computerChoice.slice(1)}</strong></p>`
    }
}

function showModal(r) {
    result.innerHTML = r
    modal.style.display = 'block'
}
modal.addEventListener('click', function () {
    this.style.display = 'none'
})

function showScore() {
    const scoreContent = `
    <p>Player: ${scoreBoard.player}</p>
                <p>Computer: ${scoreBoard.computer}</p>`
    score.innerHTML = scoreContent;
}

function checkWin() {
    const { player, computer } = scoreBoard;
    if (computer == 3) {
        if (player < 3)
            return "computer win";
    } else if (player == 3) {
        if (computer < 3)
            return "player win";
    } else {
        return "no one is win"
    }
}