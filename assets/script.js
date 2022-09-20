let startBtn = document.querySelector(".startBtn");
let timerCountDown = document.querySelector(".timer");



function startQuiz(){
    setTime();
}

function setTime(){
    let timeLeft =5;
    let timerInterval = setInterval(function(){
        timerCountDown.textContent = "Time: "+timeLeft;
        timeLeft--;
        if(timeLeft === 0){
            clearInterval(timerInterval);
            timerCountDown.textContent = "TIMES UP \u23F0";
        }
    },1000)
}





startBtn.addEventListener("click",startQuiz);