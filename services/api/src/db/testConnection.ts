import { Client } from "pg";

export async function testDbConnection() {
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: { rejectUnauthorized: false },
	});

	try {
		await client.connect();
		console.log("Database connection successful");
	} catch (error) {
		console.error("Database connection failed:", error);
	} finally {
		await client.end();
	}
}
