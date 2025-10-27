import "dotenv/config";
import { getEnv } from "./lib/env";
import { createApp } from "./app";
import { testDbConnection } from "./db/testConnection";
import { runInitScripts } from "./db/initDb";

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

const env = getEnv();
const port = Number(process.env.PORT) || 4000;
const host = "0.0.0.0";

async function startServer() {
  try {
    await testDbConnection();
    await runInitScripts();

    const app = createApp(env);
    app.listen(port, host, () => {
      console.log(`[config] Using port ${port}`);
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
