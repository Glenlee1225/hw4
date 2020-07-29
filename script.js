var btn = document.createElement("button");
var btnContainer =document.querySelector('.box');
var timerEl = document.getElementById('main');
var totalSeconds = 0;
var secondsElapsed = 0;
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
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
	},
	{
		question: "What is 1+(2*2)",
		answers: {
			a: '5',
			b: '6',
			c: '4'
		},
		correctAnswer: 'a'
	}
];

btn.textContent = "Start";         
btnContainer.appendChild(btn);


function countDown() {
    var timeLeft = 5;

    var timeInterval = setInterval(function() {
        timerEl.textContent = timeLeft-1;
        timeLeft--;
        console.log(timeLeft);

        if (timeLeft<=0) {
			timerEl.textContent="Time's up";
			
			clearInterval(timeInterval);
			showResults(myQuestions, quizContainer, resultsContainer);
			

        }
    }, 1000);
}

btn.addEventListener('click', countDown);

function showResults(questions, quizContainer, resultsContainer){
	var answerContainers = quizContainer.querySelectorAll('.answers');
	
	var userAnswer = '';
	var numCorrect = 0;
	
	for(var i=0; i<questions.length; i++){

		userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
		
		if(userAnswer===questions[i].correctAnswer){
			numCorrect++;
			answerContainers[i].style.color = 'lightgreen';
		}
		else{
			answerContainers[i].style.color = 'red';
		}
	}
	
	resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}


function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
	

	function showQuestions(questions, quizContainer){
		var output = [];
		var answers;
	
		
		for(var i=0; i<questions.length; i++){
			answers = [];
			for(letter in questions[i].answers){
				answers.push(
					'<label>'
						+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
						+ letter + ': '
						+ questions[i].answers[letter]
					+ '</label>'
				);
			}
			output.push(
				'<div class="question">' + questions[i].question + '</div>'
				+ '<div class="answers">' + answers.join('') + '</div>'
			);
		}
		quizContainer.innerHTML = output.join('');
	}

	showQuestions(questions, quizContainer);
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
}



submitButton.onclick = function(){
	showResults(questions, quizContainer, resultsContainer);
}

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

var initial = document.querySelector("Initials");
var score = document.querySelector("Score");
var submitAns = document.querySelector("btn btn-primary");


var initial = localStorage.getItem(".form-control");
var score = localStorage.getItem(".form-control");

initial.textContent = initial;
score.textContent = score;

submitAns.addEventListener("click", function() {
	initial.textContent = initial;
	score.textContent = score;

  localStorage.setItem("initial", initial);
  localStorage.setItem("score", score);
});

