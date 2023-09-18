const cors = require("cors");
const express = require("express");

const app = express();

const questions = require("./questions.json");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to GeoQuest");
});

app.get("/questions", (req, res) => {
	res.send(questions);
});

app.get("/questions/:id", (req, res) => {
	const idx = parseInt(req.params.id); //parseint checking for int

	if (isNaN(idx) || idx <= 0) {
		return res.status(400).json({ error: "Invalid id" }); //throwing error if not a nu,mber or less than arr
	}

	const question = questions.find((question) => question.id === idx);

	if (!question) {
		return res.status(404).json({ error: "Question not found" }); //throwing error if the id is not in the data
	}

	res.send(question); //returning the quote
});

module.exports = app;
