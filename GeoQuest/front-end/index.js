const worldTourBtn = document.querySelector("#world-tour");
const timeChallengeBtn = document.querySelector("#time-challenge");
const form = document.querySelector("#user-form");

const page = document.body.id;

let testName;
console.log("hello", page);

if (page == "start") {
  console.log("begin");
  form.addEventListener("submit", (e) => {
    testName = e.target.formName.value;
  });
}

//event listener on form not button
//got rid of the method="POST". the e.preventDefault was the issue

document.addEventListener("dblclick", () => {
  console.log(testName);
});
