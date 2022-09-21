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
let viewHighscoreBtn2 = document.querySelector(".viewHighschores");
let storageInfo = document.querySelector(".storageInfo");
let saveScore = document.querySelector(".saveScore");
let playAgain = document.querySelector(".reload");
let resetHighscore = document.querySelector(".reset");


//questions and their choises for the quiz
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

// sets questions for the quiz everytime a question is answered
function setQuestion() {
    let qAs = questions[quesLeft];
    questionChoice.innerHTML = "<h2>" + qAs.question + "</h2>";
    choiceA.innerHTML = "1. " + qAs.choiceA;
    choiceB.innerHTML = "2. " + qAs.choiceB;
    choiceC.innerHTML = "3. " + qAs.choiceC;
}

//check if answer is correct
function answerIsCorrect() {
    rightWrong.innerHTML = "Correct Answer";
    rightWrong.setAttribute("style", "color:green");
}

//checks if the answer is wrong
function answerIsWrong() {
    rightWrong.innerHTML = "Wrong Answer"
    rightWrong.setAttribute("style", "color:red");
}

//check answers to the questions. updates score if anser is right or wrong and 
// reduces time by 10 second if a answer is wrong
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
    // if more question left go to the next question.
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

// this function is being triggered after the start button is clicked.
// kicks off the quiz.
function startQuiz() {
    startBtn.setAttribute("style", "display:none");
    qAbox.setAttribute("style", "display:block")
    setTime();
    setQuestion();
}

//sets the time interval
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

// save the total score of a user to the local storage
function saveLastScore() {
    let highScore = {
        score: score,
        initial: initialName.value,
    }
    localStorage.setItem("highScore", JSON.stringify(highScore));
}


// gets the stored values from the local storage and displays them on clicking
// the view high score button
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

// rests to default. keeps score unless clear highscore button is triggered
function playAgainRefresh() {
    location.reload();
}

//clears local storage.
function clearHighScoreInStorage() {
    storageInfo.innerHTML = "";
    localStorage.clear();
}

//event listeners for button to play again.
playAgain.addEventListener("click", playAgainRefresh)

//event listeners for button to clear local storage.
resetHighscore.addEventListener("click", clearHighScoreInStorage);

//event listeners for button to save sore of a user when submitted.
saveScore.addEventListener("click", saveLastScore);

//event listeners for button to view high score.
viewHighscoreBtn.addEventListener('click', viewLastHighscore);
viewHighscoreBtn2.addEventListener('click', viewLastHighscore);

//event listeners for button to start the quiz.
startBtn.addEventListener("click", startQuiz);