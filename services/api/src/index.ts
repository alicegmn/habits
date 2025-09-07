import express from "express";
import cors from "cors";
import { ensureSchema, pool } from "./db/client";
import habitsRouter from "./routes/habits";
import { getEnv } from "./lib/env";

const env = getEnv();
const app = express();

app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/habits", habitsRouter);

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ detail: "Internal Server Error" });
});

ensureSchema().then(() => {
  app.listen(env.PORT, () => console.log(`API on http://0.0.0.0:${env.PORT}`));
});
