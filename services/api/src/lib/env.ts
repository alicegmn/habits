export function getEnv() {
  const PORT = Number(process.env.PORT ?? 8000);
  const DATABASE_URL =
    process.env.DATABASE_URL ??
    "postgresql://postgres:postgres@db:5432/habitsdb";
  const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:5173";

  return { PORT, DATABASE_URL, CORS_ORIGIN } as const;
}
