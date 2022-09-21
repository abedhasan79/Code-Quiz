let startBtn = document.querySelector(".startBtn");
let timerCountDown = document.querySelector(".timer");
let questionChoice = document.querySelector(".question");
let choiceBoxes = document.querySelector(".mCqs");
let rightWrong = document.querySelector(".rightWrong");
let choiceA = document.getElementById("A");
let choiceB = document.getElementById("B");
let choiceC = document.getElementById("C");
let totalScores= document.querySelector(".totalScore");
let qAbox = document.querySelector(".qAbox");
let form = document.querySelector(".form");
let initialName = document.querySelector(".formInput");

let questions = [
    {
        question : "What does HTML stand for?",
        choiceA : "Hypertext Markup Language",
        choiceB : "Cascading Style Sheet",
        choiceC : "Hyperlink Missplaced Language",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        choiceA : "Cascading Script Sheet",
        choiceB : "Cascading Style Sheet",
        choiceC : "Cascading Script Shell",
        correct : "B"
    },{
        question : "What does JS stand for?",
        choiceA : "Java Style",
        choiceB : "Java Shell",
        choiceC : "Java Script",
        correct : "C"
    }
];


let timeLeft = 5;
let score =0;
let quesLeft =0;
let lastQues = questions.length -1;

function setQuestion(){
    let q = questions[quesLeft];
    questionChoice.innerHTML = "<h2>"+ q.question +"</h2>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

function answerIsCorrect(){
    rightWrong.innerHTML ="Correct."
}


function answerIsWrong(){
    rightWrong.innerHTML ="Wrong."
}

function checkAnswer(answer){
    if( answer == questions[quesLeft].correct){
        // answer is correct
        score++;
        
        answerIsCorrect();
        totalScores.innerHTML ="Your Score: "+score;
    }else{
        // answer is wrong
        timeLeft-=10;
        answerIsWrong();
        totalScores.innerHTML ="Your Score: "+score;
    }
    
    if(quesLeft < lastQues){
        quesLeft++;
        setQuestion();
    }else{
        // end the quiz and show the score
        timerCountDown.setAttribute("style","display:none");
        qAbox.setAttribute("style","display:none");
        form.setAttribute("style","display:block");
    }
}




function startQuiz(){
    startBtn.setAttribute("style","display:none");
    setQuestion();
    setTime();
}


function setTime() {
    
    let timerInterval = setInterval(function () {
        timerCountDown.textContent = "Time: " + timeLeft;
        timeLeft--;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timerCountDown.textContent = "TIMES UP \u23F0";
            qAbox.setAttribute("style","display:none");
            form.setAttribute("style","display:block");
            totalScores.innerHTML ="Your Score: "+score;
        }
    }, 1000)
}

function saveLastScore(){
    let highScore={
        score: score,
        initial: 
    }
}


startBtn.addEventListener("click", startQuiz);