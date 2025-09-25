import express from "express";
import cors from "cors";
import habitsRouter from "./routes/habits";
import { AppError } from "./lib/errors";

export function createApp(env: { CORS_ORIGIN: string }) {
  const app = express();

  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json());

  // Health
  app.get("/health", (_req, res) => res.json({ status: "ok" }));

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
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          error: err.message,
          details: err.details,
        });
      }
      console.error("Unexpected error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  );

  return app;
}
