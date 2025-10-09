import { z } from "zod";

/**
 * Define your environment variables schema
 * (these are validated at startup)
 */
const envSchema = z.object({
	// API
	API_PORT: z.coerce.number().default(3000),
	CORS_ORIGIN: z.string().url().default("http://localhost:8080"),

	// Auth
	JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
	JWT_EXPIRATION: z.string().default("1h"),

	// DB
	DATABASE_URL: z
		.string()
		.url("DATABASE_URL must be a valid URL (postgres://...)"),

	// Global
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
});

/**
 * Safely parse + validate environment variables.
 * Throws clear error if any required variable is missing.
 */
export function getEnv() {
	const parsed = envSchema.safeParse(process.env);

	if (!parsed.success) {
		console.error("Invalid environment variables:", parsed.error.format());
		throw new Error("Invalid environment configuration");
	}

	return parsed.data;
}

export type Env = z.infer<typeof envSchema>;
