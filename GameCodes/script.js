const gameDisplay = document.getElementById("game");
const start = document.querySelector("button");
const keysDisplay = document.createElement("div");
keysDisplay.setAttribute("id", "keysDisplay");
const timeLimit = document.getElementById("timeLimit");
const letters = ["w", "a", "s", "d", "i", "j", "k", "l"];
const keysArr = [];
let keyToHit = "";
let keysArrStr = "";
let difficulty = 1;
let idx = 0;
let lvlCounter = 0;
let scoreCounter = 0;
let score = 0;

start.addEventListener("click", () => {
  //remove the start button when the game starts
  start.remove();
  //invoking the function below
  timerToStart();

  //setting a timeout so the codes waits for the timertostart to run finish before executing
  setTimeout(() => {
    (function () {
      // creating a var to store a value, this valaue will determine the time of the timer
      let sec = 30;
      //const to store the timer and create a timer
      gameTimer = setInterval(() => {
        //timeLimit div to display the countdown
        timeLimit.innerHTML = "00:" + sec;
        //reduce the timer by 1 at each 1s interval
        sec--;
        //when timer hits 0, run the following codes
        if (sec < 0) {
          clearInterval(gameTimer);
          gameDisplay.innerHTML = " ";
          endGameDisplay();
        }
      }, 1000);
    })();
    //invoking the functions below
    challenge();
    keyPress(challenge);
  }, 5000);
});
/* ---------------------start of Challenge() codes -------------------------------------------*/
function challenge() {
  keysArr.length = 0;
  //resetting the KeysDisplay to empty
  keysDisplay.innerHTML = " ";
  //setting codition to check the difficulty lvls, and if matches excute the code below
  if (difficulty === 1) {
    //using a for loop to display 5 blocks of letters
    for (let i = 0; i < 5; i++) {
      //invoking these fucktions
      idxGenerator();
      setId();
    }
  }
  if (difficulty === 2) {
    //using a for loop to display 7 blocks of letters as difficulty increased
    for (let i = 0; i < 7; i++) {
      //invoking these fucktions
      idxGenerator();
      setId();
    }
  }

  if (difficulty === 3) {
    //using a for loop to display 9 blocks of letters as difficulty increased
    for (let i = 0; i < 9; i++) {
      //invoking these fucktions
      idxGenerator();
      setId();
    }
  }
}

/* ---------------------start of keyPress() codes -------------------------------------------*/

function keyPress(callback) {
  //adding a key down event listenr
  document.addEventListener("keydown", (e) => {
    //a new const to store all the divs within the keysDisplay Div
    const keysToRemove = keysDisplay.querySelectorAll("div");

    let counter = 0;
    //iterating through all the divs
    for (let i = 0; i < keysToRemove.length; i++) {
      //testing if the key pressed is the same as the letter in that div
      if (e.key === keysToRemove[counter].innerText) {
        //if its the same remove the div
        keysToRemove[counter].remove();
        //break the loop and restart to prevent divs with the same letters to remove at the same run
        counter += 1;
        //lvl counter used to gradually increase the difficulty
        lvlCounter += 1;
        score += scoreCounter;
        break;
      }
      //if statement to check if the key pressed is not the key displayed
      if (e.key !== keysToRemove[counter].innerText) {
        //reduce the score if wrong key is pressed
        score -= scoreCounter;
        break;
      }
    }

    console.log("score: ", score);
    if (lvlCounter >= 20) {
      difficulty = 2;
    }

    if (lvlCounter > 40) {
      difficulty = 3;
    }
    //if the counter is same as length means everything from keysToremove has been removed
    if (counter === keysToRemove.length) {
      //calling back the challenge function to generate new keystohit
      callback();
    }
  });
}

/* ---------------------start of idxGenerator() codes -------------------------------------------*/

function idxGenerator() {
  //finding a random number for the idx. each level has a specific formula to only select within the right length to control the
  //the difficulty on the user end
  if (difficulty === 1) {
    idx = Math.floor(Math.abs(Math.random() * letters.length - 4));
    //at this difficuty level, the score will be increased by the value of the scoreCounter
    scoreCounter = 1;
  }

  if (difficulty === 2) {
    idx = Math.floor(Math.abs(Math.random() * letters.length - 2));
    //at this difficuty level, the score will be increased by the value of the scoreCounter
    scoreCounter = 3;
  }
  if (difficulty === 3) {
    idx = Math.floor(Math.abs(Math.random() * letters.length));
    //at this difficuty level, the score will be increased by the value of the scoreCounter
    scoreCounter = 5;
  }
}

/* ---------------------start of setId() codes -------------------------------------------*/

function setId() {
  //assining a letter from the letter array to store in the const
  const keysToInput = letters[idx];
  //remove the start button to start the game

  //adding a dive called keysDisplay to the game
  gameDisplay.appendChild(keysDisplay);
  //pushing the letters from the const keyToInput into the keysArr Array
  keysArr.push(keysToInput);
  //creating a for loop to iterate through the keysArr
  for (let i = 0; i < keysArr.length; i++) {
    //creating a new div called keyTo hit for each iteration
    keyToHit = document.createElement("div");
    //giving it the innerText which is the letter stored athe specific index in the keysArr
    keyToHit.innerText = keysArr[i];

    if (keyToHit.innerText === "w") {
      keyToHit.setAttribute("id", "letterW");
    }
    if (keyToHit.innerText === "a") {
      keyToHit.setAttribute("id", "letterA");
    }
    if (keyToHit.innerText === "s") {
      keyToHit.setAttribute("id", "letterS");
    }
    if (keyToHit.innerText === "d") {
      keyToHit.setAttribute("id", "letterD");
    }
    if (keyToHit.innerText === "i") {
      keyToHit.setAttribute("id", "letterI");
    }
    if (keyToHit.innerText === "j") {
      keyToHit.setAttribute("id", "letterJ");
    }
    if (keyToHit.innerText === "k") {
      keyToHit.setAttribute("id", "letterK");
    }
    if (keyToHit.innerText === "l") {
      keyToHit.setAttribute("id", "letterL");
    }
  }
  //adding the keysToHit into the keysDisplay div
  keysDisplay.appendChild(keyToHit);
}

/* ---------------------start of endGameDisplay() codes -------------------------------------------*/

function endGameDisplay() {
  const endDisplay = document.createElement("Div");
  endDisplay.setAttribute("id", "endDisplay");
  const endText = `Good Job! 
  Your Score is : ${score}`;
  endDisplay.innerHTML = endText;
  gameDisplay.appendChild(endDisplay);
}

/* ---------------------start of timerToStart() codes -------------------------------------------*/

function timerToStart() {
  //delcaring a var to display the seconds
  let seconds = 3;
  //creating a timer to countdown to start
  const timer = setInterval(() => {
    //create and element to display the countdown timer
    const timerDisplay = document.createElement("div");
    //give the display an id to style in css
    timerDisplay.setAttribute("id", "timer");
    //insert the seconds var into the display
    timerDisplay.innerHTML = seconds;
    //restting the gameDisplay div to empty
    gameDisplay.innerHTML = " ";
    //adding the timperDisplay to the gameDisplay div
    gameDisplay.appendChild(timerDisplay);
    //reducing the seconds by 1 t
    seconds -= 1;
    //setting an if condition to test if seconnds hit 0
    if (seconds < 0) {
      //clear the timer
      clearInterval(timer);
      //remove the timerDisplay
      timerDisplay.remove();
    }
  }, 1000);
}
