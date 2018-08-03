var winningPoint = 30;
var score = [0,0];
var turn = 0;
var singleScore = 0;
var diceNumber = 0;

var dicePath = "assets/dice/";

var diceView = document.querySelector(".dice");
var buttonRoll = document.querySelector(".btn-roll");
var buttonHold = document.querySelector(".btn-hold");

var score0 = document.querySelector("#score-0");
var score1 = document.querySelector("#score-1");
var currentScore0 = document.querySelector("#current-0");
var currentScore1 = document.querySelector("#current-1");
var playerZeroPanel = document.querySelector(".player-0-panel");
var playerOnePanel = document.querySelector(".player-1-panel");

var settingModel = document.querySelector(".model");
var modelWall = document.querySelector((".model-wall"));

var viewData = {
    "score-0-player" : document.querySelector("#score-0"),
    "score-1-player" : document.querySelector("#score-1"),
    "currentScore-0" : document.querySelector("#current-0"),
    "currentScore-1" : document.querySelector("#current-1"),
    "player-0-panel" : document.querySelector(".player-0-panel"),
    "player-1-panel" : document.querySelector(".player-1-panel"),
    "player-name-0" : document.querySelector("#name-0"),
    "player-name-1" : document.querySelector("#name-1")
};

diceView.style.opacity = 0;

document.querySelector(".btn-new").addEventListener("click",function(){
	startNewGame();
});


function startNewGame() {
	turn = 0;
    singleScore = 0;
    diceNumber = 0;
    score = [0,0];
    diceView.style.opacity = 0;
    currentScore0.textContent = singleScore;
    currentScore1.textContent = singleScore;
    score0.textContent = score[turn];
    score1.textContent = score[turn];

    playerZeroPanel.className = "player-0-panel active";
    playerOnePanel.className = "player-1-panel";

    viewData['player-name-1'].textContent = "Player 1";
    viewData['player-name-1'].classList.remove("winner");

    viewData['player-name-0'].textContent = "Player 2";
    viewData['player-name-0'].classList.remove("winner");


    buttonRoll.disabled = false;
    buttonHold.disabled = false;

}

buttonRoll.addEventListener('click',function() {
	diceNumber = Math.floor(Math.random() * 6 + 1);
	setDice(diceNumber);
	if(diceNumber === 1) {
		singleScore = 0;
        viewData['currentScore-'+turn].textContent = singleScore;
		toggleTurn();
	}else {
		singleScore += diceNumber;
        viewData['currentScore-'+turn].textContent = singleScore;
	}
	
});

buttonHold.addEventListener('click', function() {
	score[turn] += singleScore;
	singleScore = 0;
    viewData['score-'+turn+'-player'].textContent = score[turn];
    viewData['currentScore-'+turn].textContent = 0;
	if (score[turn] >= winningPoint){
        viewData['player-name-'+turn].textContent = "Winner";
        viewData['player-name-'+turn].classList.add("winner");

        buttonRoll.disabled = true;
        buttonHold.disabled = true;
    }else {
        toggleTurn();
    }
});


function setDice(number) {
    diceView.style.opacity = 1;
	diceView.setAttribute('src',dicePath+'dice-'+number+'.png')
}

function toggleTurn() {
	if(turn === 0){
		turn = 1;
		playerZeroPanel.className = "player-0-panel";
		playerOnePanel.className = "player-1-panel active";
	}else {
		turn = 0;
		playerZeroPanel.className = "player-0-panel active";
		playerOnePanel.className = "player-1-panel";
	}
}

document.querySelector("#setting-done-btn").addEventListener('click',function () {
    var data = document.getElementById("select").value;
    if (confirm("Game will be reset with this setting. Press ok to continue")) {
        winningPoint = data;
        modelWall.classList.remove("show-model");
    }else {
        modelWall.classList.remove("show-model");
    }
});

document.querySelector(".setting").addEventListener('click',function () {
    modelWall.classList.add("show-model");
    //settingModel.classList.add("show-model  ");
});
