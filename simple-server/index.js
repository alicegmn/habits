require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Always use DATABASE_URL
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

app.use(cors());
app.use(express.json());

// Ensure table exists
(async () => {
	await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      text VARCHAR(255) NOT NULL
    )
  `);
	console.log("✅ Connected to Azure DB & ensured table exists");
})();

// ---- CRUD ----

app.get("/", (req, res) => {
	res.json({ message: "Simple server with Postgres is running!" });
});

app.get("/notes", async (req, res) => {
	const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
	res.json(result.rows);
});

app.post("/notes", async (req, res) => {
	const { text } = req.body;
	const result = await pool.query(
		"INSERT INTO notes (text) VALUES ($1) RETURNING *",
		[text]
	);
	res.json(result.rows[0]);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
