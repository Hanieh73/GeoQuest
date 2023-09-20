let countSpan = document.querySelector(".count span");
let flagImgDiv = document.querySelector(".flag-img");
let flagImg = document.querySelector(".flag-img img");
let flagOptions = document.querySelector(".flag-options ul");
let flagLis = document.querySelectorAll(".flag-options ul li");
let score = document.querySelector("h3 span");
let scoreDiv = document.querySelector(".score");
let correctAns = document.querySelector(".score .right span");
let incorrectAns = document.querySelector(".score .incorrect span");
let btnNewGame = document.querySelector("#newGame");

let currentIndex = 0;
let rightAnswer = 0;

function getQuestions() {
	let myRequest = new XMLHttpRequest(); //TODO:
	myRequest.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			let questions = JSON.parse(this.responseText);
			//Number Of Question Each New Game
			let qCount = 10;
			questionNum(qCount);
			//Random Question Each New Game
			questions = questions.sort(() => Math.random() - Math.random()).slice(0, 10);

			//Add Questions Data
			addQuestionData(questions[currentIndex], qCount);

			flagLis.forEach((li) => {
				li.addEventListener("click", () => {
					let rightAnswer = questions[currentIndex].right_answer;
					li.classList.add("active");
					//Increase Index
					currentIndex++;

					//Check The Answer after 500ms
					setTimeout(() => {
						checkAnswer(rightAnswer, qCount);
					}, 500);

					setTimeout(() => {
						//Remove Previous Image Source
						flagImg.src = "";
						//Remove All Classes (active,success,wrong)
						li.classList.remove("active");
						li.classList.remove("success");
						li.classList.remove("wrong");

						//Add Questions Data To Show The Next Question
						addQuestionData(questions[currentIndex], qCount);
					}, 1000);

					//Show Results
					setTimeout(() => {
						showResults(qCount);
					}, 1002);
				});
			});
		}
	};
	myRequest.open("GET", "flag.json", true);
	myRequest.send();
}

getQuestions();

function questionNum(num) {
	countSpan.innerHTML = num;
}

function addQuestionData(obj, count) {
	if (currentIndex < count) {
		flagImg.src = `./${obj.img}`;
		//Create Options
		flagLis.forEach((li, i) => {
			//Give each Li a dynamic Id
			li.id = `answer_${i + 1}`;
			//Create for Each Li a dynamic data-attribut
			li.dataset.answer = obj[`options`][i];
			//Insert the Option in the li
			li.innerHTML = obj[`options`][i];
		});
	}
}

function checkAnswer(rAnswer, count) {
	let choosenAnswer;
	for (let i = 0; i < flagLis.length; i++) {
		if (flagLis[i].classList.contains("active")) {
			choosenAnswer = flagLis[i].dataset.answer;
			if (rAnswer === choosenAnswer) {
				flagLis[i].classList.add("success");
				rightAnswer++;
				score.innerHTML = rightAnswer;
			} else {
				flagLis[i].classList.add("wrong");
			}
		}
	}
}

//Function To Show result correct and wrong answer
function showResults(count) {
	if (currentIndex === count) {
		flagOptions.innerHTML = "";
		flagImgDiv.innerHTML = "";
		scoreDiv.style.display = "block";
		correctAns.innerHTML = rightAnswer;
		incorrectAns.innerHTML = count - rightAnswer;
	}
}

//To Generate A New Game
btnNewGame.addEventListener("click", () => {
	window.location.reload();
});

let timerElement = document.getElementById("timer");
let timerMessageElement = document.getElementById("timer-message");
let timeLeft = 5; // Set the initial time (in seconds)

function startTimer() {
	function updateTimer() {
		if (timeLeft > 0) {
			timeLeft--;
			timerElement.textContent = timeLeft;
		} else {
			// Time's up, display a message and reset the timer
			clearInterval(timerInterval);
			timerMessageElement.textContent = "Time's up! Click here to try again.";
			// You can also add a click event to the message for retrying
			timerMessageElement.addEventListener("click", () => {
				// Add any code to retry the game here, for example:
				window.location.reload(); // Reload the page to start over
			});
		}
	}

	updateTimer(); // Call the function once to update the initial display
	let timerInterval = setInterval(updateTimer, 1000); // Update the timer every 1 second (1000 milliseconds)
}

// Start the timer when the page loads
window.addEventListener("load", startTimer);
