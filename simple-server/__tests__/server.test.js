const request = require("supertest");

// --- Mock PG Pool ---
jest.mock("pg", () => {
	const mClient = {
		query: jest
			.fn()
			.mockResolvedValue({ rows: [{ id: 1, text: "Mocked note" }] }),
		connect: jest.fn(),
		end: jest.fn(),
	};
	// 👇 Exportera så vi kan manipulera i testet
	return { Pool: jest.fn(() => mClient), __mClient: mClient };
});

const { __mClient } = require("pg"); // 👈 lägg till detta
const app = require("../server");

describe("Simple Server", () => {
	it("GET / should return message", async () => {
		const res = await request(app).get("/");
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toContain("Simple server");
	});

	it("POST /notes should create a note (mocked DB)", async () => {
		// 🔥 Gör nästa DB-anrop till ett fel (simulerad krasch)
		__mClient.query.mockRejectedValueOnce(new Error("Simulated DB failure"));

		const res = await request(app)
			.post("/notes")
			.send({ text: "Hello world" })
			.set("Accept", "application/json");

		// Den här raden kommer nu FAILA eftersom status blir 500 istället för 200
		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty("text", "Mocked note");
	});
});
