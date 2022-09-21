let startBtn = document.querySelector(".startBtn");
let timerCountDown = document.querySelector(".timer");
let questionChoice = document.querySelector(".question");
let choiceBoxes = document.querySelector(".mCqs");
let rightWrong = document.querySelector(".rightWrong");
let choiceA = document.getElementById("A");
let choiceB = document.getElementById("B");
let choiceC = document.getElementById("C");
let totalScores = document.querySelector(".totalScore");
let qAbox = document.querySelector(".qAbox");
let form = document.querySelector(".form");
let initialName = document.querySelector(".formInput");
let viewHighscoreBtn = document.querySelector(".viewHighschore");
let storageInfo = document.querySelector(".storageInfo");
let saveScore = document.querySelector(".saveScore");
let playAgain = document.querySelector(".reload");
let resetHighscore = document.querySelector(".reset");

let questions = [
    {
        question: "What does HTML stand for?",
        choiceA: "Hypertext Markup Language",
        choiceB: "Cascading Style Sheet",
        choiceC: "Hyperlink Missplaced Language",
        correct: "A"
    }, {
        question: "What does CSS stand for?",
        choiceA: "Cascading Script Sheet",
        choiceB: "Cascading Style Sheet",
        choiceC: "Cascading Script Shell",
        correct: "B"
    }, {
        question: "What does JS stand for?",
        choiceA: "Java Style",
        choiceB: "Java Shell",
        choiceC: "Java Script",
        correct: "C"
    }, {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choiceA: "var",
        choiceB: "let",
        choiceC: "Both Options Are True",
        correct: "C"
    }, {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        choiceA: "getElementById()",
        choiceB: "getHtmlById()",
        choiceC: "Both Options Are True",
        correct: "A"
    }, {
        question: "How to stop an interval timer in Javascript?",
        choiceA: "clearTime()",
        choiceB: "clearInterval()",
        choiceC: "clearDocumentTime()",
        correct: "B"
    }
];


let timeLeft = 60;
let score = 0;
let quesLeft = 0;
let lastQues = questions.length - 1;

function setQuestion() {
    let q = questions[quesLeft];
    questionChoice.innerHTML = "<h2>" + q.question + "</h2>";
    choiceA.innerHTML = "1. " + q.choiceA;
    choiceB.innerHTML = "2. " + q.choiceB;
    choiceC.innerHTML = "3. " + q.choiceC;
}

function answerIsCorrect() {
    rightWrong.innerHTML = "Correct Answer";
    rightWrong.setAttribute("style", "color:green");
}


function answerIsWrong() {
    rightWrong.innerHTML = "Wrong Answer"
    rightWrong.setAttribute("style", "color:red");
}

function checkAnswer(answer) {
    if (answer == questions[quesLeft].correct) {
        // answer is correct
        score++;

        answerIsCorrect();
        totalScores.innerHTML = "Your Score: " + score;
    } else {
        // answer is wrong
        if (timeLeft > 0) {
            timeLeft -= 10;
            answerIsWrong();
            totalScores.innerHTML = "Your Score: " + score;
        }

    }

    if (quesLeft < lastQues) {
        quesLeft++;
        setQuestion();
    } else {
        // end the quiz and show the score
        timerCountDown.setAttribute("style", "display:none");
        rightWrong.setAttribute("style", "display:none");
        qAbox.setAttribute("style", "display:none");
        form.setAttribute("style", "display:block");
    }
}




function startQuiz() {
    startBtn.setAttribute("style", "display:none");
    qAbox.setAttribute("style", "display:block")
    setTime();
    setQuestion();
}


function setTime() {

    let timerInterval = setInterval(function () {
        timerCountDown.textContent = "Time: " + timeLeft;
        timeLeft--;
        if (timeLeft === 0 || timeLeft<0) {
            clearInterval(timerInterval);
            timerCountDown.textContent = "TIMES UP \u23F0";
            qAbox.setAttribute("style", "display:none");
            form.setAttribute("style", "display:block");
            totalScores.innerHTML = "Your Score: " + score;
        }
    }, 1000)
}

function saveLastScore() {
    let highScore = {
        score: score,
        initial: initialName.value,
    }
    localStorage.setItem("highScore", JSON.stringify(highScore));
}



function viewLastHighscore() {
    let lastScore = JSON.parse(localStorage.getItem("highScore"));
    storageInfo.setAttribute("style", "display:block");
    if (lastScore == null) {
        storageInfo.innerHTML = "No Highscore Avilable."
    } else {
        storageInfo.setAttribute("style", "display:block")
        storageInfo.innerHTML = "<h2>" + lastScore.initial + ": " + lastScore.score + "</h2>";
    }
    viewHighscoreBtn.addEventListener('dblclick', function () {
        storageInfo.setAttribute("style", "display:none");
    });

}

function clearStorage() {
    location.reload();
}

function clearHighScoreInStorage() {
    storageInfo.innerHTML = "";
    localStorage.clear();
}

playAgain.addEventListener("click", clearStorage)
resetHighscore.addEventListener("click", clearHighScoreInStorage);
saveScore.addEventListener("click", saveLastScore);
viewHighscoreBtn.addEventListener('click', viewLastHighscore);
startBtn.addEventListener("click", startQuiz);