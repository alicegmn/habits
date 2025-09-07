import { Router } from "express";
import { pool } from "../db/client";

const r = Router();

// GET /habits
r.get("/", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, title, description, frequency FROM habits ORDER BY id DESC"
    );
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

// POST /habits
r.post("/", async (req, res, next) => {
  try {
    const { title, description = null, frequency = "daily" } = req.body ?? {};
    if (!title || !String(title).trim()) {
      return res.status(400).json({ detail: "title is required" });
    }
    const { rows } = await pool.query(
      `INSERT INTO habits (title, description, frequency)
       VALUES ($1, $2, $3)
       RETURNING id, title, description, frequency`,
      [String(title).trim(), description, String(frequency)]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    next(e);
  }
});

export default r;
