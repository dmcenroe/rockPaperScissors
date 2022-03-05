console.log(playRound());

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
            return "rock";
        case 2:
            return "paper";
        case 3:
            return "scissors";  
        }
}

//plays a single game
//takes in the human's play and the computer's play and returns the winner
//rock beats scissors, scissors beats paper, paper beats rock
function playGame() {

    let humanPlay = window.prompt("We're playing Rock, Paper, Scissors.  Pick one to play:");
        humanPlay = humanPlay.toLowerCase();
    let computerPlay = computerTurn();
    let gameResult;

    if (humanPlay == computerPlay) {
        gameResult = "TIE"
    } else if (humanPlay == "rock" && computerPlay !== "paper") {
        gameResult = "Human Wins"
    } else if (humanPlay == "scissors" && computerPlay !== "rock") { 
        gameResult = "Human Wins"
    } else if (humanPlay == "paper" && computerPlay !== "scissors") {
        gameResult = "Human Wins"
    } else gameResult = "Computer wins"

    return [gameResult, computerPlay, humanPlay];
}



//plays a round of 5 games


function playRound() {
    let computerScore = 0;
    let humanScore = 0;
    let gameResultArray, winner, loser, winnerScore, loserScore, resolveText, humanPlay, computerPlay, gameResult;
    

    for (let i = 1; i <= 5; i++) {

        gameResultArray = playGame();
            humanPlay = gameResultArray[2];
            computerPlay = gameResultArray[1];
            gameResult = gameResultArray[0];

        if (gameResult !== "TIE") {
            if (gameResult == "Computer wins") {
            computerScore++;
            } else humanScore++;
        }
        console.log(`Game ${i}:
        Human plays: ${humanPlay}
        Computer plays: ${computerPlay}
        ${gameResult}!
        Current Score: Human: ${humanScore} - Computer: ${computerScore}`)
    }

    if (computerScore == humanScore) {
        resolveText = "It's a TIE!"
        winner = "Human";
        loser = "Computer";
        winnerScore = humanScore;
        loserScore = computerScore;
    } else if (computerScore > humanScore) {
        resolveText = "Computer wins!"
        winner = "Computer";
        loser = "Human";
        winnerScore = computerScore;
        loserScore = humanScore;
    } else {
        resolveText = "Human wins!"
        winner = "Human";
        loser = "Computer";
        winnerScore = humanScore;
        loserScore = computerScore;
    }
    return (`${resolveText}  Final Score:  ${winner}: ${winnerScore} - ${loser}: ${loserScore}`);
    }