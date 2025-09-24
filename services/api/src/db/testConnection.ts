import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

export async function testDbConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected to Azure DB:", res.rows[0]);
  } catch (err) {
    console.error("Database connection failed:", err);
  } finally {
    await pool.end();
  }
}
