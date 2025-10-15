import "dotenv/config";
import { getEnv } from "./lib/env";
import { createApp } from "./app";
import { testDbConnection } from "./db/testConnection";

const PORT = process.env.API_PORT || 3000;

async function bootstrap() {
	const env = getEnv();

	await testDbConnection();

	const app = createApp(env);

	app.listen(PORT, () => {
		console.log(`API listening on http://0.0.0.0:${env.PORT}`);
		console.log(`CORS origin: ${env.CORS_ORIGIN}`);
	});
}

bootstrap().catch((e) => {
	console.error("Failed to start server:", e);
	process.exit(1);
});
