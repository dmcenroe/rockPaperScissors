
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

    //array[0] = computer point to.toggle
    //array[1] = human point to.toggle
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

function updateRoundGraphic(game, keyPress) {

    let currGameItem;
    let gameCompleteStyle;
    let computerSelectionBox = document.querySelector(".computerSelectionBox");

    if (game.gameResult == 'Human Wins') {
        gameCompleteStyle = 'gameCompleteHuman';
        keyPress.firstElementChild.classList.add("check");
        computerSelectionBox.firstElementChild.classList.add("x");
    } else if (game.gameResult == 'Computer Wins') {
        gameCompleteStyle = 'gameCompleteComputer';
        keyPress.firstElementChild.classList.add("x");
        computerSelectionBox.firstElementChild.classList.add("check");
    } else if (game.gameResult == 'TIE') {
        gameCompleteStyle = 'gameCompleteTie';
        keyPress.firstElementChild.classList.add("x");
        computerSelectionBox.firstElementChild.classList.add("x");
    }
    currGameItem = document.querySelector(".game" + `${game.roundNumber+1}`);
    currGameItem.innerText = "";
    currGameItem.classList.toggle(gameCompleteStyle);

        //disable buttons at end of round
        let buttons = document.querySelectorAll(".gameButton");
        buttons.forEach(gameButton => gameButton.disabled = true);
        buttons.forEach(gameButton => gameButton.classList.toggle("disabledButton"));

        //toggle overlay at end of game
        setTimeout(() => toggleOverlay(game), 400);

}

function toggleOverlay(game){
    let container = document.querySelector(".container");
    let overlay = document.createElement("div");
    let newGameBtn = document.createElement("button");
    let gameRoundText = document.createElement("div");

    overlay.classList.toggle("overlay")
    container.append(overlay);

    gameRoundText.innerText = game.gameResult + "!";
    gameRoundText.classList.toggle("gameRoundText");
    overlay.append(gameRoundText);

    newGameBtn.classList.toggle("newGameButton");
    newGameBtn.innerText = "Next Round";
    overlay.append(newGameBtn);

        //reset a game when reset button is pushed
        let nextGameButton = document.querySelector(".newGameButton");
        nextGameButton.addEventListener('click', newRound);
}

function updateText(game, keyPress) {

    let versus = document.createElement("div");
    versus.classList.toggle("versus");
    versus.innerText = "vs.";

    //toggle gui element for the computers selection below the players selection
    let computerSelectionBox = document.createElement("div");
    computerSelectionBox.classList.toggle("computerSelectionBox");
    computerSelectionBox.innerText = game.computerPlay;
    keyPress.closest('div').append(versus);
    keyPress.closest('div').append(computerSelectionBox);

    //toggle a div for the computer's check mark or x to go in
    let winLoseIndicator = document.createElement("winLoseIndicator");
    computerSelectionBox.appendChild(winLoseIndicator);

    //print game result below the two gui elements
    // let gameResultText = document.createElement("div");
    // gameResultText.classList.toggle("gameResultText");
    // gameResultText.innerText = game.gameResult + "!";
    // computerSelectionBox.parentElement.append(gameResultText);

    document.querySelector(".playerWinCounter").innerText = game.currPlayerScore;
    document.querySelector(".computerWinCounter").innerText = game.currComputerScore;

}

function playGame(keyPress, game) {

    // keyPress.classList.toggle("buttonPressed");
    //document.querySelector().style.backgroundColor = 'red';


    //get the plays and get game result
    let humanPlay = keyPress.innerText;
    let computerPlay = computerTurn();
    
    game.humanPlay = humanPlay;
    game.computerPlay = computerPlay;


    game.gameResult = getGameResult(game);

    getPoints(game);            //get the points earned from the game result and.toggle it to each players current score
    updateText(game, keyPress);           //update ui text displays
    updateRoundGraphic(game, keyPress);   //update graphical round display

    game.roundNumber += 1;
    checkRound();

    return game;
}

function newRound() {
    let overlay = document.querySelector(".overlay");
    let computerSelectionBox = document.querySelector(".computerSelectionBox");
    let versus = document.querySelector(".versus");
    let winLoseIndicator = document.querySelectorAll(".winLoseIndicator");
    let gameButton = document.querySelectorAll(".gameButton");
        
        // gameResultText.remove();
        versus.remove();
        overlay.remove();
        computerSelectionBox.remove();
        winLoseIndicator.forEach(removeIndicator => removeIndicator.classList.remove("check"));
        winLoseIndicator.forEach(removeIndicator => removeIndicator.classList.remove("x"));
        gameButton.forEach(removeStyle => removeStyle.classList.remove("buttonPressed"));


        //enable buttons
        let buttons = document.querySelectorAll(".gameButton");
        buttons.forEach(gameButton => gameButton.disabled = false);
        buttons.forEach(gameButton => gameButton.classList.toggle("disabledButton"));
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

        document.querySelector(".playerWinCounter").innerText = "0";
        document.querySelector(".computerWinCounter").innerText = "0";

        game = {humanPlay:"", computerPlay:"", currPlayerScore:0, currComputerScore:0
        , roundNumber:0, gameResult:null};

        let allCircles = document.querySelectorAll(".visualRoundItem");
            allCircles.forEach(visualRoundItem => visualRoundItem.classList.remove("gameCompleteHuman"));
            allCircles.forEach(visualRoundItem => visualRoundItem.classList.remove("gameCompleteComputer"));
            allCircles.forEach(visualRoundItem => visualRoundItem.classList.remove("gameCompleteTie"));

        document.querySelector(".game1").innerText = "1";
        document.querySelector(".game2").innerText = "2";   
        document.querySelector(".game3").innerText = "3";   
        document.querySelector(".game4").innerText = "4";   
        document.querySelector(".game5").innerText = "5";   

        newRound();

}

function checkRound() {


if (game.roundNumber !== -1) {

    if (game.roundNumber == 5) {
        roundContainerChildren = document.querySelector(".roundContainer").children;
    
        for (let i = 0; i < roundContainerChildren.length; i++) {
            roundContainerChildren[i].classList.toggle("hide-element");
        }
    
        roundContainer = document.querySelector(".roundContainer");
        roundContainer.classList.toggle("endOfRound")

        let endOfRoundContent = document.createElement("h3");
        endOfRoundContent.classList.toggle("endOfRoundContent");
        endOfRoundContent.innerText = "End of Round!"
        roundContainer.appendChild(endOfRoundContent);

        let newGameButton = document.createElement("button");
        newGameButton.innerText = "Play Again";
        newGameButton.classList.toggle("resetButton");
        roundContainer.appendChild(newGameButton);
        resetButton = document.querySelector(".resetButton");
        resetButton.addEventListener('click', resetGame);


    } else playGame(this, game);
}
}

function createGameSession() {

    let game = {humanPlay:"", computerPlay:"", currPlayerScore:0, currComputerScore:0
    , roundNumber:0, gameResult:null};

    Number(document.querySelector(".playerWinCounter").innerText = "0");
    Number(document.querySelector(".computerWinCounter").innerText = "0");

    return game;
}

 
let game = createGameSession();

//start a game when player clicks a button
let playerSelection = document.querySelectorAll(".gameButton");
playerSelection.forEach(gameButton => gameButton.addEventListener('click', checkRound));





