import express from "express";
import cors from "cors";
import authRoutes from "./routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Auth-service running on port ${PORT}`);
});
