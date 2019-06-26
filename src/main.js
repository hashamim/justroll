import initScene from "./init_scene";
import levelLoader from "./levels";
Physijs.scripts.worker = "js/physijs_worker.js";
Physijs.scripts.mmp = "js/ammo.js";




document.addEventListener("keydown", (event) => {
    if(event.keyCode === 27){
        cancelAnimationFrame( window.animationId );
    }
})
let levels = levelLoader();

// document.addEventListener("DOMContentLoaded", initScene);
window.startGame = startGame;
function startGame(){
    var content = document.getElementById("content");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    document.getElementById("start-modal").style.display = "none";
    document.getElementById("lose-modal").style.display = "none";
    document.getElementById("next-modal").style.display = "none";
    initScene(levels);
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
}


