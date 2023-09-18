const worldTourBtn = document.querySelector("#world-tour");
const timeChallengeBtn = document.querySelector("#time-challenge");
const form = document.querySelector("#user-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.formName.value);
});
//event listener on form not button
