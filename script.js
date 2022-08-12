"use strict";

let score = 20;
let highscore = 0;
let highscoreContent = document.querySelector(".highscore");
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let guessRef = document.querySelector(".guess");
let check = document.querySelector(".check");
let reset = document.querySelector(".again");

const displayMessage = (message) => {
  document.querySelector(".message").textContent = message;
};

const displayScore = (message) => {
  document.querySelector(".score").textContent = message;
};

const displayNum = (num, style) => {
  let selector = document.querySelector(".number");
  selector.textContent = num;
  selector.style.width = style;
};

const bgColor = (color) => {
  document.querySelector("body").style.backgroundColor = color;
};

const getBgColor = () => {
  let x = Math.trunc(Math.random() * 256);
  let y = Math.trunc(Math.random() * 256);
  let z = Math.trunc(Math.random() * 256);
  return `rgb(${x}, ${y}, ${z})`;
};

check.addEventListener("click", () => {
  let guess = Number(guessRef.value);
  if (!guess) {
    displayMessage("No number! 😕");
  } else if (guess === secretNumber) {
    displayMessage("Correct Number! ✨");
    bgColor(getBgColor());
    displayNum(secretNumber, "30rem");

    if (score > highscore) {
      localStorage.setItem("highscore", highscore);
      highscore = score;
      highscoreContent.textContent = highscore;
      console.log("CURRENT:", highscore);
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "Too high!" : "Too Low!");
      score--;
      displayScore(score);
    } else {
      displayMessage("You lost the game!");
      displayScore(0);
    }
  }
});

// RESET FUNCTIONALITY

reset.addEventListener("click", () => {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage("Start guessing...");
  displayScore(score);
  guessRef.value = "";
  bgColor("#222");
  displayNum("?", "15rem");
});
