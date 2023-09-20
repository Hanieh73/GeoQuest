const submitBtn = document.querySelector("#submit-button");
let cIndex = 0;
submitBtn.addEventListener("click", function () {
  checkAnswer(cIndex);
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
    console.log(data);
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
  answerElements.forEach((answerInput, index) => {
    answerDiv.innerHTML += `<label for="${answerArr[index]}" class="answer-radio">
       <input type="radio" id="${answerArr[index]}" name="answer" value="${choices[index]}" /> ${choices[index]}
    </label>`;
    // console.log(choices[index]);
  });

  submitButton.disabled = false;
  resultElement.textContent = "";
}

async function checkAnswer(cIndex) {
  console.log("buenos dias");
  if (document.querySelector("input[name=answer]:checked")) {
    console.log("checked");
    let chosenAnswer = document.querySelector(
      "input[name=answer]:checked"
    ).value;
    console.log(chosenAnswer);
    let resp = await fetch(`http://localhost:3000/questions/${cIndex + 1}`);
    //console.log(resp);
    if (resp.ok) {
      const data = await resp.json();
      console.log(data, data.correct_answer);
      if (chosenAnswer == data.correct_answer) {
        console.log("Correct Answer");
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
      console.log("THE END");
    } else {
      cIndex += 1;
      loadQuestions(cIndex);
    }
  } else {
    console.log("Something went wrong with API request");
  }
}

//for some reason
