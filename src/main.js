import initScene from "./init_scene";
import levelLoader from "./levels";
import { startTimer } from "./timer";
Physijs.scripts.worker = "js/physijs_worker.js";
Physijs.scripts.mmp = "js/ammo.js";


document.addEventListener("keydown", (event) => {
    if(event.keyCode === 13){
        if(window.gameState === 1){
            if(currentLevel >= levels.length - 1){
                window.returnToMenu();
                return;
            }
            window.startLevel();
        } else if(window.gameState === 2){
            debugger
            window.retryLevel();
        }
    }
})
let levels = levelLoader();
let scores = new Array(levels.length);
document.addEventListener("DOMContentLoaded",()=>{
    let scoreBoard = document.getElementById("scores");
    scores.forEach((ele,ind)=>{
        let levelScoresList = document.createElement("UL");
        levelScoresList.setAttribute("id",`level${ind}`);
        let levelTitle = document.createElement("H3");
        levelTitle.innerHTML = `Level ${ind}`;
        levelTitle.setAttribute("onclick", `startLevel(${ind - 1})`);
        scoreBoard.appendChild(levelTitle);
        scoreBoard.appendChild(levelScoresList);
        levelScoresList.style.padding = "0";
    })
})
for(let i = 0; i < scores.length; i++){
    scores[i] = [];
}
let currentLevel = -1;
window.startLevel = startLevel;
function startLevel(firstLevel = currentLevel){
    currentLevel = firstLevel;
    currentLevel++;
    var content = document.getElementById("content");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    document.getElementById("start-modal").style.display = "none";
    document.getElementById("lose-modal").style.display = "none";
    document.getElementById("next-modal").style.display = "none";
    if (currentLevel < levels.length) {
        initScene(levels[currentLevel], winLevel);
        startTimer();
    } else {
        document.getElementById("start-modal").style.display = "flex";
        currentLevel = -1;
    }
}

window.retryLevel = retryLevel;
function retryLevel(){
    var content = document.getElementById("content");
    while(content.firstChild) {
        content.removeChild(content.firstChild);
    }
    document.getElementById("start-modal").style.display = "none";
    document.getElementById("lose-modal").style.display = "none";
    document.getElementById("next-modal").style.display = "none";
    startTimer();
    initScene(levels[currentLevel], winLevel);

}
window.returnToMenu = returnToMenu;
function returnToMenu(){
    var content = document.getElementById("content");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    document.getElementById("win-modal").style.display = "none";
    document.getElementById("next-modal").style.display = "none";
    document.getElementById("start-modal").style.display = "flex";
    levels = levelLoader();
    document.getElementById("timer").innerHTML = "";
}

function winLevel(score){
    scores[currentLevel].push(score);
    let newScore = document.createElement("LI");
    newScore.innerHTML = score;
    document.getElementById(`level${currentLevel}`).appendChild(newScore);
    if(currentLevel < levels.length - 1){
        document.getElementById("next-modal").style.display = "flex";
    } else {
        document.getElementById("win-modal").style.display = "flex";
    }
}


