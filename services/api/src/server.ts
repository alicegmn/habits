import "dotenv/config";
import { getEnv } from "./lib/env";
import { createApp } from "./app";
import { testDbConnection } from "./db/testConnection";
import { runInitScripts } from "./db/initDb";
import { property } from "zod";

const env = getEnv();
const port = env.PORT;
const host = "0.0.0.0";

async function startServer() {
	try {
		// Verify DB connection before starting
		await testDbConnection();
		// Initialize DB schema and seed data
		await runInitScripts();

		// Create and start app
		const app = createApp(env);
		app.listen(port, host, () => {
			console.log(`API running on http://${host}:${port}`);
			console.log(`CORS origin: ${env.CORS_ORIGIN}`);
		});
	} catch (err) {
		console.error("Failed to start server:", err);
		process.exit(1);
	}
}

if (require.main === module) {
	startServer();
}

export default startServer;
