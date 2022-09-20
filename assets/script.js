let startBtn = document.querySelector(".startBtn");
let timerCountDown = document.querySelector(".timer");

let abed = document.querySelector(".mCqs");

var myQuestions = [
	{
		question: "What is 10/2?",
		answers: {
			a: '3',
			b: '5',
			c: '115'
		},
		correctAnswer: 'b'
	},
	{
		question: "What is 30/3?",
		answers: {
			a: '3',
			b: '5',
			c: '10'
		},
		correctAnswer: 'c'
	}
];


abed.innerHTML = Object.values(myQuestions[0].answers).map((size) => `<section>
<input type="radio" name="size" value="${size}" id="${size}">
 <label for="${size}">${size}</label>
</section>`).join(' ');

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