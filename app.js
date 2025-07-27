let highest = Number(localStorage.getItem("highest"));

let score = document.querySelector(".score");
let highScore = document.querySelector(".high-score");
let startBtn = document.querySelector(".startBtn");
let restart = document.querySelector(".restart");
let rulesBtn = document.querySelector(".rules");
let rulesInfo = document.querySelector(".info");
highScore.innerHTML = `Highest Score: ${highest}`;

let toggle = false;

rulesBtn.addEventListener("click", function () {
  if (!toggle) {
    rulesInfo.classList.remove("hidden");
    rulesInfo.classList.remove("slide-up");
    rulesInfo.classList.add("slide-down");
    rulesInfo.addEventListener("animationend", function handler(e) {
      if (e.animationName === "slideDown") {
        rulesInfo.style.transform = "translate(-50%, -50%)";
        rulesInfo.classList.remove("slide-down");
        rulesInfo.removeEventListener("animationend", handler);
      }
    });
  } else {
    rulesInfo.classList.remove("slide-down");
    rulesInfo.classList.add("slide-up");
    rulesInfo.addEventListener("animationend", function handler(e) {
      if (e.animationName === "slideUp") {
        rulesInfo.classList.add("hidden");
        rulesInfo.style.transform = "translate(-50%, -500%)";
        rulesInfo.classList.remove("slide-up");
        rulesInfo.removeEventListener("animationend", handler);
      }
    });
  }

  toggle = !toggle;
});

let gameSeq = [];
let userSeq = [];

let started = false;
let points = -1;

let btns = ["red", "blue", "yellow", "purple"];

if (highest !== null) {
  highest = Number(highest);
  highScore.innerHTML = `Highest Score: ${highest}`;
} else {
  highest = -1;
  highScore.innerHTML = "";
}

function startGame() {
  if (!started) {
    started = true;
    scoreUp();
  }
}

startBtn.addEventListener("click", function () {
  startGame();
  this.classList.add("opacity");
});

document.addEventListener("keydown", startGame);

function btnFlash(btn) {
  btn.classList.add("darken");
  setTimeout(function () {
    btn.classList.remove("darken");
  }, 200);
}

function scoreUp() {
  userSeq = [];
  points++;
  score.innerHTML = `Score: ${points}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  gameSeq.push(randColor);

  let flashDelay = 600;
  if (points > 5) flashDelay = 500;
  if (points > 10) flashDelay = 400;

  for (let i = 0; i < gameSeq.length; i++) {
    setTimeout(() => {
      const color = gameSeq[i];
      const btn = document.querySelector(`.${color}`);
      btnFlash(btn);
    }, i * flashDelay);
  }
}

function checkSeq(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(() => {
        scoreUp();
      }, 1000);
    }
  } else {
    const finalScore = points;

    if (finalScore > highest) {
      highest = finalScore;
      localStorage.setItem("highest", highest);
      highScore.innerHTML = `🏆 New High Score: ${highest}`;
    } else {
      highScore.innerHTML = `Highest Score: ${highest}`;
    }

    score.innerHTML = `❌ Game Over! Final score: <b>${finalScore}</b>`;
    restart.innerText = "Press any key to restart!";

    document.body.classList.add("shake");

    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 500);

    reset();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkSeq(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  points = -1;
  startBtn.classList.remove("opacity");
  startBtn.innerText = "Play Again!";
}
