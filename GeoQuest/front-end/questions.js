async function loadQuestions() {
  try {
    const response = await fetch("../back-end/questions.json");
    //const response = await fetch(`http://localhost:3000/questions/${currentQuestionIndex}`);

    if (!response.ok) {
      throw new Error("Failed to fetch questions!");
    }

    const data = await response.json();

    //current index position
    cIndex += 1;
    displayQuestions(data, cIndex);
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

async function checkAnswer(currentQuestionIndex) {
  if (document.querySelector("input[name=answer]:checked")) {
    console.log("checked");
    let chosenAnswer = document.querySelector(
      "input[name=answer]:checked"
    ).value;
    console.log(chosenAnswer);
    let resp = await fetch(
      `http://localhost:3000/questions/${currentQuestionIndex}`
    );
    console.log(resp);
    if (resp.ok) {
      const data = await resp.json();
      console.log(data, data.correct_answer);
      if (chosenAnswer == data.correct_answer) {
        //run function that tells them its the correct answer
        //and displays the next question
        // setTimeout(displayQuestions(,currentQuestionIndex + 1),5000);
      } else {
        console.log("Wrong Answer");
      }
    }
  } else {
    console.log("unchecked");
    console.log("NO ANSWER SELECTED");
  }
}

let cIndex = -1;

// loadQuestions();
const submitBtn = document.querySelector("#submit-button");
submitBtn.addEventListener("click", loadQuestions);
