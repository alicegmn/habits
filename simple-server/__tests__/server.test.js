const request = require("supertest");

// mocked pg Pool so it doesn’t hit a real database
jest.mock("pg", () => {
	const mClient = {
		query: jest
			.fn()
			.mockResolvedValue({ rows: [{ id: 1, text: "Mocked note" }] }),
		connect: jest.fn(),
		end: jest.fn(),
	};
	return { Pool: jest.fn(() => mClient) };
});

const app = require("../server");

describe("Simple Server", () => {
	it("GET / should return message", async () => {
		const res = await request(app).get("/");
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toContain("Simple server");
	});

	it("POST /notes should create a note (mocked DB)", async () => {
		const res = await request(app)
			.post("/notes")
			.send({ text: "Hello world" })
			.set("Accept", "application/json");

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty("text", "Mocked note");
	});
});
