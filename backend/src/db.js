import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/habitsdb";

export const pool = new Pool({ connectionString: DATABASE_URL });

export async function ensureSchema() {
  const sql = `
  CREATE TABLE IF NOT EXISTS habits (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NULL,
    frequency VARCHAR(20) NOT NULL DEFAULT 'daily',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  `;
  await pool.query(sql);
}
