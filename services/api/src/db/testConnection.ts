import { Client } from "pg";

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // ms

export async function testDbConnection() {
	const connectionString = process.env.DATABASE_URL;

	if (!connectionString) {
		throw new Error("DATABASE_URL is missing in environment variables");
	}

	let attempt = 1;
	while (attempt <= MAX_RETRIES) {
		const client = new Client({
			connectionString,
			ssl: { rejectUnauthorized: false },
		});

		try {
			console.log(
				`🔄 Attempting DB connection (try ${attempt}/${MAX_RETRIES})...`
			);
			await client.connect();

			const res = await client.query("SELECT NOW()");
			console.log("Connected to Azure DB at:", res.rows[0].now);
			await client.end();
			return true; // success, exit retry loop
		} catch (error: any) {
			console.error(
				`Database connection failed (try ${attempt}):`,
				error.code || error.message
			);
			if (attempt === MAX_RETRIES) {
				console.error("Max retries reached. Exiting...");
				throw error;
			}
			attempt++;
			await new Promise((res) => setTimeout(res, RETRY_DELAY));
		} finally {
			await client.end().catch(() => null);
		}
	}

	return false;
}
