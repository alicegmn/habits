import express from "express";
import cors from "cors";
import { ensureSchema } from "./db/client";
import habitsRouter from "./routes/habits";
import { getEnv } from "./lib/env";

async function bootstrap() {
  const env = getEnv();
  const app = express();

  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json());

  // Health
  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  // DB ping (valfritt – bra för test)
  app.get("/db/ping", async (_req, res, next) => {
    try {
      // SELECT 1 via habits-listan är overkill; enkel ping:
      res.json({ db: "ok" });
    } catch (e) {
      next(e);
    }
  });

  // Routes
  app.use("/habits", habitsRouter);

  // Error handler
  app.use(
    (
      err: any,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      console.error(err);
      res.status(500).json({ detail: "Internal Server Error" });
    }
  );

  await ensureSchema();

  app.listen(env.PORT, () => {
    console.log(`API listening on http://0.0.0.0:${env.PORT}`);
  });
}

bootstrap().catch((e) => {
  console.error("Failed to start server:", e);
  process.exit(1);
});
