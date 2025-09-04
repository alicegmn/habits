import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool, ensureSchema } from "./db.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8000);
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());

// Health
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// DB ping
app.get("/db/ping", async (_req, res, next) => {
  try {
    await pool.query("SELECT 1");
    res.json({ db: "ok" });
  } catch (err) {
    next(err);
  }
});

// List habits
app.get("/habits", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, title, description, frequency FROM habits ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// Create habit
app.post("/habits", async (req, res, next) => {
  try {
    const { title, description = null, frequency = "daily" } = req.body || {};
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ detail: "title is required" });
    }
    const { rows } = await pool.query(
      `INSERT INTO habits (title, description, frequency)
       VALUES ($1, $2, $3)
       RETURNING id, title, description, frequency`,
      [title.trim(), description, String(frequency)]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Fallback error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ detail: "Internal Server Error" });
});

async function start() {
  await ensureSchema();
  app.listen(PORT, () => {
    console.log(`Node/Express API listening on http://0.0.0.0:${PORT}`);
  });
}

start().catch((e) => {
  console.error("Failed to start server:", e);
  process.exit(1);
});
