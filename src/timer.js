
let startTime, endTime, display, timeScores, timerInterval;
document.addEventListener("DOMContentLoaded", ()=> display = document.getElementById("timer"));

export function startTimer(){
    startTime = Date.now();
    render();
    timerInterval = setInterval(render, 50)
}

function currentTime(){
    return Date.now() - startTime;
}

export function endTimer(){
    clearInterval(timerInterval);
    return render();
}

function render(){
    console.log("timer running");
    let currTime = currentTime();
    let centSec = "" + Math.floor((currTime % 1000) / 10)
    let seconds = currTime / 1000;
    let minutes = "" + Math.floor(seconds / 60);
    seconds = "" + Math.floor(seconds % 60);
    seconds = addLeadingZero(seconds);
    minutes = addLeadingZero(minutes);
    centSec = addLeadingZero(centSec);
    display.innerHTML = minutes + ":" + seconds + ":" + centSec;
    return display.innerHTML;
}

function addLeadingZero(str){
    while(str.length < 2){
        str = "0" + str;
    }
    return str;
}

