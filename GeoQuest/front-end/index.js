const worldTourBtn = document.querySelector("#world-tour");
// const timeChallengeBtn = document.querySelector("#time-challenge");
const form = document.querySelector("#user-form");

const page = document.body.id;

let testName;
console.log("hello", page);

if (page == "start") {
  form.addEventListener("submit", (e) => {
    // e.preventDefault();
    testName = e.target.formName.value;
    console.log(`test name is ${testName}`, e);
    localStorage.setItem("name", testName);
    console.log(localStorage.getItem("name"));
  });
} else if (page == "index") {
  const userMsg = document.querySelector("#user-msg");
  userMsg.textContent = `Welcome ${localStorage.getItem("name")}!`;
}

//event listener on form not button
//got rid of the method="POST". the e.preventDefault was the issue

// document.addEventListener("dblclick", () => {
//   console.log(testName);
// });
