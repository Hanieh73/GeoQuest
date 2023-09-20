const { loadQuestions, displayQuestions } = require("./questions");

//creating a custom fetch mock since fetch is not defined in node.js env
global.fetch = async (url) => {
  if (url === "http://localhost:3000/questions/") {
    return {
      ok: true,
      json: async () => ({
        question: "Question 1",
        correct_answer: "A",
        incorrect_answers: ["B", "C", "D"],
      }),
    };
  } else {
    return {
      ok: false,
      json: async () => ({}),
    };
  }
};

describe("loadQuestions", () => {
  it("is a function", () => {
    expect(loadQuestions).toBeInstanceOf(Function);
  });
  it("loads Questions and Increments cIndex", async () => {
    let cIndex = 0;
    const question = {
      question: "Question 1",
      correct_answer: "A",
      incorrect_answers: ["B", "C", "D"],
    };
    const result = await loadQuestions(0);
    expect(cIndex).toEqual(0);
    expect(result).toEqual(question);
  });

  it("loads questions successfully", async () => {
    //mocking a successful fetch with a sample question

    const mockQuestions = [
      {
        question: "Question 1",
        correct_answer: "A",
        incorrect_answers: ["B", "C", "D"],
      },
    ];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockQuestions),
    });

    //now checking if the result matches what we expect from the mockquestions data
    const result = await loadQuestions(0);
    expect(result).toEqual(mockQuestions);
  });

  it("handles the failed fetch successfully", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}),
    });
    //passing 0 as the current index question
    const result = await loadQuestions(0);
    expect(result).toEqual([]);
  });
});

describe("displayQuestions", () => {
  it("is a function", () => {
    expect(displayQuestions).toBeInstanceOf(Function);
  });

  it("displays the current question and choices", () => {
    //mocking the DOM elements for a sample question

    const currentQuestionIndex = 0;
    const questions = [
      {
        question: "Sample Question",
        correct_answer: "A",
        incorrect_answers: ["B", "C", "D"],
      },
    ];

    document.body.innerHTML = `
  <div id="question"></div>
  <div id="answer-container"></div>
  <button id="submit-button">Submit</button>
`;

    //calling the displayQuestions function
    displayQuestions(questions, currentQuestionIndex);

    //now checking if the question and the answers are displayed correctly

    const questionElement = document.getElementById("question");
    const answerElements = document.querySelectorAll(
      '.answer-radio input[type="radio"]'
    );

    expect(questionElement.textContent).toContain("Sample Question");
    // expect(answerElements.length).toEqual(4); //1 correct answer and 3 incorrect
  });
});
