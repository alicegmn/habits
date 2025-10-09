import "dotenv/config";
import { getEnv } from "./lib/env";
import { createApp } from "./app";
import { testDbConnection } from "./db/testConnection";
import { runInitScripts } from "./db/initDb";

const env = getEnv();
const port = process.env.API_PORT || 3000;
const host = "0.0.0.0";

async function startServer() {
	try {
		// Verify DB connection before starting
		await testDbConnection();

		await runInitScripts(); // 🔹 initialize DB schema

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
