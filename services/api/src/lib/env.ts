import { z } from "zod";

// define schema for env variables
const envSchema = z.object({
  PORT: z
    .string()
    .default("8000")
    .transform((val) => Number(val)),

  DATABASE_URL: z
    .string()
    .url("DATABASE_URL måste vara en giltig URL")
    .default("postgresql://postgres:postgres@db:5432/habitsdb"),

  CORS_ORIGIN: z.string().default("http://localhost:5173"),
});

export function getEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
}
