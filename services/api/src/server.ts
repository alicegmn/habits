import "dotenv/config";
import { getEnv } from "./lib/env";
import { ensureSchema } from "./db/client";
import { testDbConnection } from "./db/testConnection";
import { createApp } from "./app";

async function bootstrap() {
  const env = getEnv();

  await ensureSchema();
  await testDbConnection();

  const app = createApp(env);

  app.listen(env.PORT, () => {
    console.log(`API listening on http://0.0.0.0:${env.PORT}`);
    console.log(`CORS origin: ${env.CORS_ORIGIN}`);
  });
}

bootstrap().catch((e) => {
  console.error("Failed to start server:", e);
  process.exit(1);
});
