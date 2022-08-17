let initialTime = 1500;
let restTime = 300;

function returnFormatedTime(time) {
    return `${Math.trunc(time/60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
}

const displayWork = document.querySelector(".work-display-time");
const displayPause= document.querySelector(".pause-display-time");

displayWork.textContent = returnFormatedTime(initialTime);
displayPause.textContent = returnFormatedTime(restTime);

const startPauseBtn = document.querySelector(".start-btn");
startPauseBtn.addEventListener("click", togglePomodoro);


let currentInterval = false;
let timerID;
function togglePomodoro() {
    handlePlayPause()

    if(currentInterval) return;
    currentInterval = true;

    initialTime--;
    displayWork.textContent = returnFormatedTime(initialTime);
    handleClassAnimation({work: true, rest: false});

    timerID = setInterval(handleTicks, 1000);
}

let pause = true;

function handlePlayPause() {
    if(startPauseBtn.firstElementChild.src.includes("play")) {
        startPauseBtn.firstElementChild.src = "pause.svg"
        pause = false;
    } else {
        startPauseBtn.firstElementChild.src = "play.svg"
        pause = true;
    }
}

function handleClassAnimation (itemState) {
    for(const item in itemState) {
        if(itemState[item]) {
            document.querySelector(`.${item}`).classList.add("active");
        }
        else {
            document.querySelector(`.${item}`).classList.remove("active");
        }
    }
}

const cycles = document.querySelector(".cycles")
let cyclesNumber = 0;

function handleTicks(){

  if(!pause && initialTime > 0){
    initialTime--;
    displayWork.textContent = returnFormatedTime(initialTime)
    handleClassAnimation({work: true, rest: false})
  }
  else if(!pause && initialTime === 0 && restTime > 0) {
    restTime--;
    displayPause.textContent = returnFormatedTime(restTime)
    handleClassAnimation({work: false, rest: true})

  }
  else {
    initialTime = 1499;
    restTime = 300;
    displayWork.textContent = returnFormatedTime(initialTime)
    displayPause.textContent = returnFormatedTime(restTime)
    cyclesNumber++;
    cycles.textContent = `Cycle(s) : ${cyclesNumber}`
  }
}

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", reset);

function reset() {
    initialTime = 1500;
    restTime = 300;
    displayWork.textContent = returnFormatedTime(initialTime);
    displayPause.textContent = returnFormatedTime(restTime);

    handleClassAnimation({work: false, rest: false})
    startPauseBtn.firstElementChild.src = "play.svg";
    cycles.textContent = "Cycle(s) : 0";

    clearInterval(timerID);
    currentInterval = false;
}
