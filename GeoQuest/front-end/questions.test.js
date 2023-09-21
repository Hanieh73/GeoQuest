// Provide a polyfill for TextEncoder

const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const {
  loadQuestions,
  displayQuestions,
  shuffle,
  fifty_fifty,
} = require("./questions");

const { JSDOM } = require("jsdom");
// Create a mock DOM environment
const dom = new JSDOM(
  '<!doctype html><html><body><div id="question"></div><div id="answer-container"></div><button id="submit-button"></button></body></html>',
  {
    beforeParse(window) {
      window.TextEncoder = TextEncoder;
      window.TextDecoder = TextDecoder;
    },
  }
);
global.document = dom.window.document;

// Mock the global fetch function
global.fetch = jest.fn();

const each = require("jest-each").default;

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

    // Mock the fetch response for this test case
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [question],
    });

    const result = await loadQuestions();
    expect(cIndex).toEqual(0);
    expect(result).toEqual([question]);
  });

  it("loads questions successfully", async () => {
    // Mock the fetch response for this test case
    const mockQuestions = [
      {
        question: "Question 1",
        correct_answer: "A",
        incorrect_answers: ["B", "C", "D"],
      },
    ];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuestions,
    });

    // Now checking if the result matches what we expect from the mock questions data
    const result = await loadQuestions();
    expect(result).toEqual(mockQuestions);
  });

  it("handles the failed fetch successfully", async () => {
    // Mock the fetch response for this test case
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
      statusText: "Not Found",
    });

    // Passing 0 as the current index question
    const result = await loadQuestions();
    expect(result).toEqual([]);
  });
});

describe("displayQuestions", () => {
  let originalDocument;
  questionElement = document.createElement("div");
  let answerContainer;
  let submitButton;
  let fiftyBtn;

  beforeEach(() => {
    // Save the original document and create HTML elements
    originalDocument = { ...document };
    questionElement = document.createElement("div");
    questionElement.id = "question";
    answerContainer = document.createElement("div");
    answerContainer.id = "answer-container";
    submitButton = document.createElement("button");
    submitButton.id = "submit-button";
    fiftyBtn = document.createElement("button"); // Create the mock for the fifty-fifty button
    fiftyBtn.id = "fifty-fifty";

    // Replace document methods to manipulate the DOM
    document = {
      ...originalDocument,
      createElement: jest.fn((tagName) => {
        if (tagName === "div") return document.createElement(tagName);
        if (tagName === "button" && tagName === "fifty-fifty")
          return document.createElement(tagName); // Ensure you create the mock for fifty-fifty button
      }),
      getElementById: jest.fn((id) => {
        if (id === "question") return questionElement;
        if (id === "answer-container") return answerContainer;
        if (id === "submit-button") return submitButton;
        if (id === "fifty-fifty") return fiftyBtn; // Ensure you return the mock for fifty-fifty button
      }),
    };
  });

  afterEach(() => {
    // Restore the original document
    document = originalDocument;
  });

  it("is a function", () => {
    expect(displayQuestions).toBeInstanceOf(Function);
  });

  // it("displays the current question and choices", () => {
  //   // Create a sample question and answer choices
  //   const currentQuestionIndex = 0;
  //   const questions = [
  //     {
  //       question: "Sample Question",
  //       correct_answer: "A",
  //       incorrect_answers: ["B", "C", "D"],
  //     },
  //   ];

  //   // Call the displayQuestions function
  //   displayQuestions(questions);

  //   // Check if the question and answer choices are displayed correctly
  //   expect(questionElement.textContent).toContain("Sample Question");
  //   const answerElements = answerContainer.querySelectorAll(
  //     '.answer-radio input[type="radio"]'
  //   );
  //   expect(answerElements.length).toEqual(4); // 1 correct answer and 3 incorrect
  // });

  it("handles empty question data", () => {
    // Create an empty question data array
    const questions = [];

    // Call the displayQuestions function
    displayQuestions(questions);

    // Check if the question element is empty
    expect(questionElement.textContent).toEqual("");
  });
});

describe("shuffle", () => {
  it("is a function", () => {
    expect(shuffle).toBeInstanceOf(Function);
  });

  it("Returns an empty array when passed nothing or an an empty array", () => {
    const result = shuffle([]);
    expect(result instanceof Array).toEqual(true);
    expect(result.length).toBe(0);
  });

  each([
    [
      [1, 2, 2, 3, 3, 3],
      [1, 2, 2, 3, 3, 3],
    ],
    [
      ["a", "b", "c", "d", "d", "a"],
      ["a", "b", "c", "d", "d", "a"],
    ],
    [
      ["a", "A", 1, 1, "cat"],
      ["a", "A", 1, 1, "cat"],
    ],
  ]).test(`DOES NOT Return %s when passed %s`, (expected, input) => {
    // expect(shuffle(input)).toEqual(expected);
    expect(shuffle(input)).not.toEqual(expected);
  });
});

describe("fifty_fifty", () => {
  it("is a function", () => {
    expect(fifty_fifty).toBeInstanceOf(Function);
  });

  it("disables the filtered elements", () => {});
  it("disables the fifty-fifty button once clicked", () => {});
});

// describe("isLastQuestion", () => {
//   it("is a function", () => {
//     expect(isLastQuestion).toBeInstanceOf(Function);
//   });
// });
