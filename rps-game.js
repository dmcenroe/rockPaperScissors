
//get a random number to randomize computer rock paper scissors selection (1-3)
function getRandNum(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return parseInt(Math.floor(Math.random() * (max - min + 1) + min));
}

//computer's selection based on the random number generated
function computerTurn() {
    
    let selection = null;

    switch (getRandNum(1,3)) {
        case 1:
            return "Rock";
        case 2:
            return "Paper";
        case 3:
            return "Scissors";  
        }
}

function getGameResult(game) {
    if (game.humanPlay === game.computerPlay) {
        return gameResult = "TIE"

    } else if (game.humanPlay === "Rock" && game.computerPlay !== "Paper") {
        return gameResult = "Human Wins";

    } else if (game.humanPlay === "Scissors" && game.computerPlay !== "Rock") { 
        return gameResult = "Human Wins";

    } else if (game.humanPlay === "Paper" && game.computerPlay !== "Scissors") {
        return gameResult = "Human Wins"

    } else  {
        return gameResult = "Computer Wins"
    }
}

function getPoints(game) {

    //array[0] = computer point to add
    //array[1] = human point to add
    switch (game.gameResult) {
        case "TIE":
             return;
        case "Human Wins":
            game.currPlayerScore += 1;
            return;
        case "Computer Wins":
            game.currComputerScore += 1;
            return;
    }
}


function updateRoundGraphic(game) {

    let currGameItem;
    let gameCompleteStyle;
    
    if (game.gameResult == 'Human Wins') {
        gameCompleteStyle = 'gameCompleteHuman';
    } else if (game.gameResult == 'Computer Wins') {
        gameCompleteStyle = 'gameCompleteComputer';
    } else if (game.gameResult == 'TIE') {
        gameCompleteStyle = 'gameCompleteTie';
    }
    currGameItem = document.querySelector(".game" + `${game.roundNumber+1}`);
    currGameItem.classList.toggle(gameCompleteStyle);
}

function updateText(game) {
    document.querySelector(".playerSelection").innerText = game.humanPlay;
    document.querySelector(".computerSelection").innerText = game.computerPlay;
    document.querySelector(".gameResult").innerText = `${game.gameResult}!`;
    document.querySelector(".playerWinCounter").innerText = game.currPlayerScore;
    document.querySelector(".computerWinCounter").innerText = game.currComputerScore;
    document.querySelector(".roundNumber").innerText = game.roundNumber +1;
}

function playGame(keyPress) {

   //establish current scores and round number before the game is played
    let currPlayerScore = Number(document.querySelector(".playerWinCounter").innerText);
    let currComputerScore = Number(document.querySelector(".computerWinCounter").innerText);
    let roundNumber = Number(document.querySelector(".roundNumber").innerText);



    //get the plays and get game result
    let humanPlay = keyPress;
    let computerPlay = computerTurn();
    let game = {humanPlay:humanPlay, computerPlay:computerPlay, currPlayerScore:currPlayerScore, currComputerScore:currComputerScore
                , roundNumber:roundNumber, gameResult:null};
    
    game.gameResult = getGameResult(game);

    getPoints(game);            //get the points earned from the game result and add it to each players current score
    updateText(game);           //update ui text displays
    updateRoundGraphic(game);   //update graphical round display

    return game;
}

function resetGame() {
    hiddenElements = document.querySelectorAll(".hide-element");
    
        for (let i = 0; i < hiddenElements.length; i++) {
            hiddenElements[i].classList.toggle("hide-element");
        }

        let roundContainer = document.querySelector(".roundContainer");
        roundContainer.classList.toggle("endOfRound")

        let endOfRoundContent = document.querySelector(".endOfRoundContent");
        endOfRoundContent.classList.toggle("hide-element");
        endOfRoundContent.remove();

        let newGameButton = document.querySelector(".resetButton");
        newGameButton.classList.toggle("hide-element");
        newGameButton.remove();

        document.querySelector(".playerSelection").innerText = "";
        document.querySelector(".computerSelection").innerText = "";
        document.querySelector(".gameResult").innerText = "";
        document.querySelector(".playerWinCounter").innerText = 0;
        document.querySelector(".computerWinCounter").innerText = 0;
        document.querySelector(".roundNumber").innerText = 0;

        let allCircles = document.querySelectorAll(".visualRoundItem");
            allCircles.forEach(visualRoundItem => visualRoundItem.classList.remove("gameCompleteHuman"));
            allCircles.forEach(visualRoundItem => visualRoundItem.classList.remove("gameCompleteComputer"));
            allCircles.forEach(visualRoundItem => visualRoundItem.classList.remove("gameCompleteTie"));



}

function checkRound() {

    let roundNumber = Number(document.querySelector(".roundNumber").innerText);

if (roundNumber !== -1) {

    if (roundNumber == 5) {
        roundContainerChildren = document.querySelector(".roundContainer").children;
    
        for (let i = 0; i < roundContainerChildren.length; i++) {
            roundContainerChildren[i].classList.toggle("hide-element");
        }

        roundNumberElement = document.querySelector(".roundNumber");
        roundNumberElement.innerText = -1;
        roundNumberElement.classList.add("hide-element");
    
        roundContainer = document.querySelector(".roundContainer");
        roundContainer.classList.toggle("endOfRound")

        let endOfRoundContent = document.createElement("div");
        endOfRoundContent.classList.add("endOfRoundContent");
        endOfRoundContent.innerText = "End of Round!"
        roundContainer.appendChild(endOfRoundContent);

        let newGameButton = document.createElement("button");
        newGameButton.innerText = "Play Again";
        newGameButton.classList.add("resetButton");
        roundContainer.appendChild(newGameButton);
        resetButton = document.querySelector(".resetButton");
        resetButton.addEventListener('click', resetGame);


    } else playGame(this.innerText);
}
}

//start a game when player clicks a button
let playerSelection = document.querySelectorAll(".gameButton");
playerSelection.forEach(gameButton => gameButton.addEventListener('click', checkRound));

//reset a game when reset button is pushed
