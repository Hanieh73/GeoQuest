let lifeline = 3;
let score = 0;
let cIndex = 0;
let fiftyBtn;
let lifelineEl;
let questionsData = [];

const loadQuestions = async () => {
  try {
    const response = await fetch("http://localhost:3000/questions/");
    if (!response.ok) {
      console.error("Error loading questions:", response.statusText);
      return [];
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    } else {
      console.error("Error loading questions: Invalid data format");
      return [];
    }
  } catch (error) {
    console.error("Error loading questions:", error.message);
    return [];
  }
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function displayQuestions(questions) {
  const currentQuestion = questions[cIndex];

  if (!currentQuestion) {
    console.error("No question data found.");
    return;
  }

  const questionElement = document.getElementById("question");
  const answerElements = document.querySelectorAll(
    '.answer-radio input[type="radio"]'
  );
  const submitButton = document.getElementById("submit-button");
  const resultElement = document.getElementById("result");
  // document.getElementById(
  //   "question-number"
  // ).textContent = `Question ${questions.length}`;

  questionElement.textContent = `Question ${cIndex + 1}: ${
    currentQuestion.question
  }`;

  answerElements.forEach((answerInput) => {
    answerInput.checked = false;
  });

  const choices = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ];

  const answerArr = ["answerA", "answerB", "answerC", "answerD"];
  const answerDiv = document.querySelector("#answer-container");
  answerDiv.innerHTML = "";

  const answerDivArr = [];
  answerElements.forEach((answerInput, index) => {
    answerDivArr.push(`<label for="${answerArr[index]}" class="answer-radio">
      <input type="radio" id="${answerArr[index]}" name="answer" value="${choices[index]}" /> ${choices[index]}
    </label>`);
  });

  const shuffledArr = shuffle(answerDivArr);
  shuffledArr.forEach((answerInput, index) => {
    answerDiv.innerHTML += shuffledArr[index];
  });

  if (lifeline > 0) {
    fiftyBtn.disabled = false;
  } else {
    fiftyBtn.disabled = true;
  }

  submitButton.disabled = false;
  resultElement.textContent = "";
}

function fifty_fifty() {
  const answerElements = document.querySelectorAll(
    '.answer-radio input[type="radio"]'
  );

  //This line below can disabled the correct answers option
  const shuffledAnswers = Array.from(answerElements).filter((_, index) => {
    return index % 2 === 0; // Keep every other answer (2nd and 4th answers)
  });

  shuffledAnswers.forEach((answerInput) => {
    answerInput.disabled = true;
  });
  fiftyBtn = document.querySelector("#fifty-fifty");
  fiftyBtn.disabled = true;
  lifelineEl = document.getElementById("lifeline");
  lifelineEl.textContent = `Lifeline Count: ${lifeline}`;
}

async function initializeGame() {
  questionsData = await loadQuestions();
  if (questionsData.length > 0) {
    displayQuestions(questionsData);
  }
}

async function checkAnswer() {
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
        document.getElementById("score-count").textContent = `Score: ${score}`;
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
  if (cIndex === questionsData.length - 1) {
    console.log(`THE END! Your score is ${score}`);
    const submitBtn = document.querySelector("#submit-button");
    submitBtn.disabled = true;
  } else {
    cIndex += 1;
    displayQuestions(questionsData);
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  const submitBtn = document.querySelector("#submit-button");
  fiftyBtn = document.querySelector("#fifty-fifty");

  submitBtn.addEventListener("click", function () {
    checkAnswer();
  });

  fiftyBtn.addEventListener("click", function () {
    if (lifeline > 0) {
      lifeline -= 1;
      fifty_fifty();
    }
  });

  await initializeGame();
});

module.exports = {
  loadQuestions,
  shuffle,
  displayQuestions,
  fifty_fifty,
  checkAnswer,
  fiftyBtn,
  initializeGame,
  isLastQuestion,
};
