let startBtn = document.querySelector(".startBtn");
let timerCountDown = document.querySelector(".timer");
let questionChoice = document.querySelector(".question");
let choiceBoxes = document.querySelector(".mCqs");
let rightWrong = document.querySelector(".rightWrong");
let highSchores= document.querySelector("viewHighschores");


let myQuestions = [
    {
        question: "What is 10/2?",
        answers: {
            a: '3',
            b: '5',
            c: '115'
        },
        correctAnswer: '5'
    },
    {
        question: "What is 30/3?",
        answers: {
            a: '3',
            b: '5',
            c: '10'
        },
        correctAnswer: '10'
    }
];


console.log(myQuestions.length);

// questionChoice.innerHTML = Object.values(myQuestions[0].question).join('');
// choiceBoxes.innerHTML = Object.values(myQuestions[0].answers).map((choice) => `<section>
// <input type="text" name="size" value="${choice}" id="${choice}" readonly>
// </section>`).join(' ');

function answerSelected(e) {
    console.log(e);
    if (this.clicked) {
        document.querySelector('.rightWrong').innerText = `${this.value}`;
    }

}



let lastQuestion = myQuestions.length - 1;
let quesLeft = 0;
function setQuestion() {
    console.log('next');
    questionChoice.innerHTML = Object.values(myQuestions[quesLeft].question).join('');
    choiceBoxes.innerHTML = Object.values(myQuestions[quesLeft].answers).map((choice) => `<section>
    <input type="text" name="size" value="${choice}" id="${choice}" readonly>
    </section>`).join(' ');

    const radioButtons = document.querySelectorAll('input[name="size"]');
    for (const radioButton of radioButtons) {
        radioButton.addEventListener('change', answerSelected);
    }
    choiceBoxes.addEventListener('click', function () {

        // quesLeft++;
        setQuestion();
        
        // if (quesLeft < lastQuestion) {
        //     if (answer[0] == myQuestions[quesLeft].correctAnswer) {
        //         rightWrong.innerHTML += "Correct answer";
        //         quesLeft++;
        //         setQuestion();
        //     } else if (answer[1] == myQuestions[quesLeft].correctAnswer) {
        //         rightWrong.innerHTML += "Correct answer";
        //         quesLeft++;
        //         setQuestion();
        //     } else if (answer[2] == myQuestions[quesLeft].correctAnswer) {
        //         rightWrong.innerHTML += "Correct answer";
        //         quesLeft++;
        //         setQuestion();
        //     } else {
        //         rightWrong.innerHTML += "Wrong answer";
        //         quesLeft++;
        //         setQuestion();
        //     }

        // }
    })

}

function startQuiz() {
    setTime();
    setQuestion();
}

function setTime() {
    let timeLeft = 60;
    let timerInterval = setInterval(function () {
        timerCountDown.textContent = "Time: " + timeLeft;
        timeLeft--;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timerCountDown.textContent = "TIMES UP \u23F0";
        }
    }, 1000)
}





startBtn.addEventListener("click", startQuiz);