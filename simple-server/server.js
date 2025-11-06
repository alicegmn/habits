const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

// ---- DATABASE CONNECTION ----
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false }, // works everywhere (Azure, local)
});

app.use(cors());
app.use(express.json());

// ---- ENSURE TABLE EXISTS ----
(async () => {
	try {
		await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) NOT NULL
      );
    `);
		console.log("✅ Connected to database & ensured 'notes' table exists");
	} catch (err) {
		console.error("❌ DB connection failed:", err.message);
	}
})();

// ---- ROUTES ----
app.get("/", (req, res) => {
	res.json({ message: "Simple server with Postgres is running!" });
});

app.get("/notes", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch notes" });
	}
});

app.post("/notes", async (req, res) => {
	try {
		const { text } = req.body;
		const result = await pool.query(
			"INSERT INTO notes (text) VALUES ($1) RETURNING *",
			[text]
		);
		res.json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to create note" });
	}
});

// ---- TEST ROUTES ----
app.get("/error", () => {
	throw new Error("Intentional test error!");
});

app.get("/stress", (req, res) => {
	// eslint-disable-next-line no-unused-vars
	const bigArray = Array(1e7).fill("data");
	res.json({ status: "Memory spiked!" });
});

module.exports = app;
