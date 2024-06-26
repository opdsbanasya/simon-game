let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector('h2');
let hs = document.createElement("p");

let playbtn = document.querySelector("#play");

h2.before(hs,"");
hs.style.fontSize = "1.5rem"; 

document.addEventListener("keypress", () => {
    if (started == false) {
        // console.log("game started")
        started = true;
    }
    levelUp();
})
playbtn.addEventListener("click", () => {
    if (started == false) {
        // console.log("game started")
        started = true;
    }
    levelUp();
})
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level : ${level}`;
    if (level > highScore) {
        highScore = level;
    }
    // random btn choose
    let ranIdx = Math.floor(Math.random() * 3)
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);
    // console.log(ranColor);
    // console.log(ranBtn);
    // console.log(ranIdx);
    gameSeq.push(ranColor);
    console.log("gs", gameSeq)
    gameFlash(ranBtn);
    highScor(highScore);
}
function highScor(highScore) {
    hs.innerText = `Your high score is ${highScore}`;
}

function checkAns(idx) {
    // console.log("curr level : ",level);
    // let idx = level-1;
    if (userSeq[idx] === gameSeq[[idx]]) {
        // console.log("same val");
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start`;
        let gameOver = document.querySelector("body");
        gameOver.style.backgroundColor = "red";
        setTimeout(function () {
            gameOver.style.backgroundColor = "white";
        }, 250);
        reset();
    }


}

// * humne yha bhut sare btn vars declre kr liye but ye clash nhi karenge bcoz sare btns ka apna ek alg scope h
function btnPress() {
    // console.log("btn was pressed")
    // console.log(this)
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    console.log("us", userSeq);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn")
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
