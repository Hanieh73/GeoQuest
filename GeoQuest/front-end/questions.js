const submitBtn = document.querySelector("#submit-button");
const fiftyBtn = document.querySelector("#fifty-fifty");

let cIndex = 0;
let score = 0;
let lifeline = 3;

submitBtn.addEventListener("click", function () {
  checkAnswer(cIndex);
});

fiftyBtn.addEventListener("click", async function () {
  let response = await fetch(`http://localhost:3000/questions/`);
  const data = await response.json();
  const currentQuestion = data[cIndex];
  if (lifeline > 0) {
    fifty_fifty(currentQuestion);
    lifeline -= 1;
  }
});

loadQuestions(cIndex);

async function loadQuestions(currentQuestionIndex) {
  // console.log(cIndex);
  try {
    //const response = await fetch("../back-end/questions.json");
    let response = await fetch(`http://localhost:3000/questions/`);
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch questions!");
    }

    const data = await response.json();

    displayQuestions(data, currentQuestionIndex);
  } catch (error) {
    console.error("Error loading questions:", error);
    return [];
  }
}

function displayQuestions(questions, currentQuestionIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const questionElement = document.getElementById("question");
  const answerElements = document.querySelectorAll(
    '.answer-radio input[type="radio"]'
  );
  const submitButton = document.getElementById("submit-button");
  const resultElement = document.getElementById("result");

  console.log(currentQuestion);

  questionElement.textContent = `Question ${currentQuestionIndex + 1} : ${
    currentQuestion.question
  }`;

  // Clear any previous selections
  answerElements.forEach((answerInput) => {
    answerInput.checked = false;
  });

  const choices = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ];

  let answerArr = ["answerA", "answerB", "answerC", "answerD"];
  const answerDiv = document.querySelector("#answer-container");
  answerDiv.innerHTML = "";
  answerDivArr = [];
  answerElements.forEach((answerInput, index) => {
    answerDivArr.push(`<label for="${answerArr[index]}" class="answer-radio">
       <input type="radio" id="${answerArr[index]}" name="answer" value="${choices[index]}" /> ${choices[index]}
    </label>`);
    // console.log(choices[index]);
  });

  shuffledArr = shuffle(answerDivArr);
  shuffledArr.forEach((answerInput, index) => {
    answerDiv.innerHTML += shuffledArr[index];
  });

  if (lifeline > 0) {
    fiftyBtn.disabled = false;
  } else {
    fiftyBtn.dispatchEvent = true;
  }

  submitButton.disabled = false;
  resultElement.textContent = "";
}

async function checkAnswer(cIndex) {
  if (document.querySelector("input[name=answer]:checked")) {
    let chosenAnswer = document.querySelector(
      "input[name=answer]:checked"
    ).value;

    let resp = await fetch(`http://localhost:3000/questions/${cIndex + 1}`);

    if (resp.ok) {
      const data = await resp.json();

      if (chosenAnswer == data.correct_answer) {
        console.log("Correct Answer");
        score += 1;
      } else {
        console.log("Wrong Answer");
      }
      isLastQuestion();
    }
  } else {
    console.log("unchecked");
    alert("NO ANSWER SELECTED! PLEASE SELECT AN ANSWER!");
  }
}

async function isLastQuestion() {
  let resp = await fetch(`http://localhost:3000/questions`);
  if (resp.ok) {
    const data = await resp.json();
    if (cIndex == data.length - 1) {
      //MAKE SOMETHING SAYING THAT WAS THE LAST QUESTION OR JUST SHOW SCORES
      console.log(`THE END! Your score is ${score}/15`);
      submitBtn.disabled = true;
    } else {
      cIndex += 1;
      loadQuestions(cIndex);
    }
  } else {
    console.log("Something went wrong with API request");
  }
}

//for some reason
function fifty_fifty(currentQuestion) {
  //NEED to uncheck all the answer

  const answerElements = document.querySelectorAll(
    '.answer-radio input[type="radio"]'
  );
  console.log("50/50");
  incorrect_answers = currentQuestion.incorrect_answers;
  console.log(incorrect_answers);
  answerElements.forEach((answerInput, index) => {
    console.log(answerElements[index].value);

    // if (incorrect_answers.includes(answerElements[index].value)) {
    //   answerElements[index].disabled = true;
    // }
    if (
      answerElements[index].value == incorrect_answers[0] ||
      answerElements[index].value == incorrect_answers[2]
    ) {
      answerElements[index].disabled = true;
    }
  });
  fiftyBtn.disabled = true;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
