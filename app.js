let highest = Number(localStorage.getItem("highest")) || -1;

let score = document.querySelector(".score");
let highScore = document.querySelector(".high-score");
highScore.innerHTML = `Highest Score: ${highest}`;

let gameSeq = [];
let userSeq = [];

let started = false;
let points = -1;

let btns = ["red", "blue", "yellow", "purple"];

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;

    scoreUp();
  }
});

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

    score.innerHTML = `❌ Game Over! Final score: <b>${finalScore}</b><br>Press any key to restart`;

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
}
