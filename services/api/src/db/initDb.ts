import fs from "fs";
import path from "path";
import { Client } from "pg";

export async function runInitScripts() {
	const connectionString = process.env.DATABASE_URL;

	if (!connectionString) {
		throw new Error("❌ DATABASE_URL is missing");
	}

	const client = new Client({
		connectionString,
		ssl: { rejectUnauthorized: false },
	});

	try {
		await client.connect();
		console.log("🔗 Connected to DB — running init scripts...");

		const initDir = path.resolve(__dirname, "../../../infra/db/init");
		const files = fs
			.readdirSync(initDir)
			.filter((file) => file.endsWith(".sql"))
			.sort();

		for (const file of files) {
			const filePath = path.join(initDir, file);
			const sql = fs.readFileSync(filePath, "utf-8");
			console.log(`📜 Executing ${file}...`);
			await client.query(sql);
		}

		console.log("✅ All init scripts executed successfully!");
	} catch (err) {
		console.error("❌ Error running init scripts:", err);
		throw err;
	} finally {
		await client.end();
	}
}
