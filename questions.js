function checkAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert ('You have not selected an answer.')
        return;
    } else if (selected && selected.value === 'Edinburgh') {
        alert (`Correct!`);
    } else {
        alert (`Wrong! The capital of Scotland Edinburgh.`);
    }
}

function selectAnswer(answer) {
    if (answer === 'Edinburgh') {
        alert (`Correct! The capital of Scotland is ${answer}.`)
    } else {
        alert (`Wrong! The capital of Scotland is not ${answer}.`)
    }
}

// async function fetchQuizData() {
//     try {
//         const respData = await fetch(`https://opentdb.com/api.php?amount=10&category=22&type=multiple`);

//         if (respData.ok) {
//             let randomIndex = Math.floor(Math.random() * respData.results.length);
//             const question = respData.results[randomIndex].question;
//             const correctAnswer = respData.results[randomIndex].correct_answer;
//             const wrongAnswers = respData.results[randomIndex].incorrect_answers;
            
//         } else {
//             throw "Something has gone wrong with one of the API requests";
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }