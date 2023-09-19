const request = require("supertest");
const app = require("./app", "./index");
const questions = require("./questions.json");
const port = 300;

describe("GET /", () => {
	it('responds with "Welcome to GeoQuest"', async () => {
		const response = await request(app).get("/");
		expect(response.status).toBe(200);
		expect(response.text).toBe("Welcome to GeoQuest");
	});
});

describe("GET /questions", () => {
	it("Responds with the json data for questions", async () => {
		const response = await request(app).get("/questions");
		expect(response.status).toBe(200);
		expect(response.headers["content-type"]).toMatch(/application\/json/);

		const jsonData = JSON.parse(response.text);

		expect(jsonData) == questions;
	});
});

describe("GET /questions/:id", () => {
	it("Respond with the json data of the id entered", async () => {
		const testId = "5";

		const response = await request(app).get(`/questions/${testId}`);

		expect(response.status).toBe(200);
		expect(response.headers["content-type"]).toMatch(/application\/json/);

		const jsonData = JSON.parse(response.text);

		expect(jsonData.id) == testId;
	});
});

describe("Server Listening", () => {
	let server;

	beforeAll((done) => {
		server = app.listen(port, () => {
			console.log(`Server is live on port ${port}.`);
			done();
		});
	});

	afterAll((done) => {
		if (server) {
			server.close((err) => {
				if (err) {
					console.error(err);
				} else {
					console.log("Server closed successfully.");
				}
				done();
			});
		} else {
			console.log("Server was not started, so no need to close.");
			done();
		}
	});

	it("Should respond with 200 OK when the server is running", async () => {
		const response = await request(app).get("/");
		expect(response.status).toBe(200);
	});
});
