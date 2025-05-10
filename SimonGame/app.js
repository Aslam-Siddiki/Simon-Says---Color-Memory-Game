let gameSeq=[];
let userSeq=[];
let highScore=0;
let btns = ["pink","orange","blue","indigo"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game started");
        started =  true;
        
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() *4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    
    if(userSeq[idx] === gameSeq[idx] ){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{

        if(level > highScore){
            highScore = level;
        }
        h2.innerHTML = `Game Over! Your score is<b> ${level}</b> <br> Highest score was<b> ${highScore}</b> <br> Press any Key to start.`;

        let body = document.querySelector(".body");
        body.style.backgroundColor = "#DC3545";
        h1.style.color = "white";
        h2.style.color = "white";
        setTimeout(function(){
            body.style.backgroundColor = "white";
            h1.style.color = "black";
            h2.style.color = "black";
        },1000)

        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click",btnPress);
}
  
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}