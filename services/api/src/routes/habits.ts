import { Router } from "express";
import { pool } from "../db/client";
import { AppError } from "../lib/errors";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const router = Router();

router.use(limiter);
// GET /habits
router.get("/", async (_req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM habits ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET /habits/:id
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new AppError("Invalid habit ID", 400);
    }

    const result = await pool.query("SELECT * FROM habits WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      throw new AppError("Habit not found", 404);
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST /habits
router.post("/", async (req, res, next) => {
  const { user_id, title, description, frequency } = req.body;

  if (!user_id || !title) {
    return next(new AppError("user_id and title are required", 400));
  }

  try {
    const result = await pool.query(
      `INSERT INTO habits (user_id, title, description, frequency)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, title, description || null, frequency || "daily"]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT /habits/:id
router.put("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new AppError("Invalid habit ID", 400);
    }

    const { title, description, frequency } = req.body;
    if (!title) {
      throw new AppError("Title is required", 400);
    }

    const result = await pool.query(
      `UPDATE habits
       SET title = $1,
           description = $2,
           frequency = $3,
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [title, description || null, frequency || "daily", id]
    );

    if (result.rows.length === 0) {
      throw new AppError("Habit not found", 404);
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PATCH /habits/:id
router.patch("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new AppError("Invalid habit ID", 400);

    const fields = [];
    const values: any[] = [];
    let idx = 1;

    if (req.body.title !== undefined) {
      fields.push(`title = $${idx++}`);
      values.push(req.body.title);
    }

    if (req.body.description !== undefined) {
      fields.push(`description = $${idx++}`);
      values.push(req.body.description);
    }

    if (req.body.frequency !== undefined) {
      fields.push(`frequency = $${idx++}`);
      values.push(req.body.frequency);
    }

    if (fields.length === 0) {
      throw new AppError("No fields provided for update", 400);
    }

    fields.push(`updated_at = NOW()`);

    const query = `
      UPDATE habits
      SET ${fields.join(", ")}
      WHERE id = $${idx}
      RETURNING *
    `;

    values.push(id);

    const result = await pool.query(query, values);
    if (result.rows.length === 0) throw new AppError("Habit not found", 404);

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /habits/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new AppError("Invalid habit ID", 400);
    }

    const result = await pool.query(
      "DELETE FROM habits WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      throw new AppError("Habit not found", 404);
    }

    res.json({ message: "Habit deleted", habit: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

export default router;
