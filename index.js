// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")

function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1
    if (player1Turn) {
        player1Score += randomNumber;
        console.log("are you here");
        addDice(randomNumber, player1Turn);
        player1Scoreboard.textContent = player1Score
        if (player1Score < 20) {
          setTimeout(() => {
            player1Dice.classList.remove("active")
            player2Dice.classList.add("active")
            message.textContent = "Player 2 Turn"
            removeAnimation();
        }, 1000);
      }
    } else {
        player2Score += randomNumber
        addDice(randomNumber, player1Turn);
        player2Scoreboard.textContent = player2Score
        if (player2Score < 20) {
          setTimeout(() => {
            player2Dice.classList.remove("active")
            player1Dice.classList.add("active")
            message.textContent = "Player 1 Turn"
            removeAnimation();
          }, 1000);
        }
    }
    
    if (player1Score >= 20) {
        message.textContent = "Player 1 Wins 🥳"
        processWin(player1Dice);
    }  else if (player2Score >= 20) {
        message.textContent = "Player 2 Wins 🎉"
        processWin(player2Dice);
    }
    player1Turn = !player1Turn
});
 
resetBtn.addEventListener("click", function(){
    reset()
});

/* Remove colors and blinking from Win message, add reset button */
function processWin (playerDice) {
  message.classList.add("blinking");
  playerDice.classList.remove("active");
  showResetButton()
}

/* Reset Game */
function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    message.classList.remove("blinking");
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
    player1Dice.style.backgroundColor = '#ffd3b6';
    player2Dice.style.backgroundColor = '#ffd3b6';
}

/* Choose dice image based on random number */
function addDice(randomNumber, player1Turn) {
  let image = 'dice' + randomNumber + '.png';
  console.log(image);
  if (player1Turn) {
    player1Dice.style.backgroundColor = "transparent";
    addAnimation(player1Dice);
    player1Dice.innerHTML = `<img src='img/${image}' class='dice' alt='dice'>`;
  } else {
    player2Dice.style.backgroundColor = 'transparent';
    addAnimation(player2Dice);
    player2Dice.innerHTML = `<img src='img/${image}' class='dice' alt='dice'>`;
  }
}

/* Add dice animation classes */
function addAnimation(playerDice) {
  playerDice.classList.add('animate__animated');
  playerDice.classList.add('animate__rotateIn');
}

/* remove dice animation classes */
function removeAnimation() {
  player1Dice.classList.remove('animate__animated');
  player1Dice.classList.remove('animate__rotateIn');
  player2Dice.classList.remove('animate__animated');
  player2Dice.classList.remove('animate__rotateIn');
}