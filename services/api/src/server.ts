// import "dotenv/config";
// import { getEnv } from "./lib/env";
// import { testDbConnection } from "./db/testConnection";
// import { runInitScripts } from "./db/initDb";
// import { createApp } from "./app";

import express from "express";

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

const port = Number(process.env.PORT) || 4000;
const host = "0.0.0.0";

async function startServer() {
  try {
    // Temporärt: ingen DB-anslutning
    // await testDbConnection();
    // await runInitScripts();

    // Skapa en enkel Express-app
    const app = express();

    app.get("/", (req, res) => {
      res.send("Välkommen till ditt API 🚀");
    });

    app.listen(port, host, () => {
      console.log(`[config] Using port ${port}`);
      console.log(`API running on http://${host}:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

// Starta direkt om filen körs direkt (t.ex. node server.js)
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export default startServer;
