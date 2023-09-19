const worldTourBtn = document.querySelector("#world-tour");
// const timeChallengeBtn = document.querySelector("#time-challenge");
// const form = document.querySelector("#user-form");

worldTourBtn.addEventListener("click", () => {
  //redirect to the questions page and passing a parameter to indicate the quiz type is world tour
  window.location.href = "questions.html?type=world-tour";
});

// timeChallengeBtn.addEventListener("click", () => {
//   //redirect to the questions page, but will add setTimeout later on
//   window.location.href = "questions.html";
// });

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log(e.target.formName.value);
// });
// //event listener on form not button
