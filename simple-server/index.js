require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:3000", // local server
      "http://localhost:5173", // vite
      "http://localhost:5500", // live server
      "http://localhost:62153", // serve
      "https://your-swa-url.azurestaticapps.net", // prod frontend
    ],
  })
);
app.use(express.json());

app.use(express.json());

// Postgres pool
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: process.env.PG_SSL === "true" ? { rejectUnauthorized: false } : false,
});

// Ensure table exists
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      text VARCHAR(255) NOT NULL
    )
  `);
  console.log("DB ready");
})();

app.get("/", (req, res) => {
  res.json({ message: "Simple server with Postgres is running!" });
});

// ---- CRUD ----

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
