import express from "express";
import cors from "cors";
import authRoutes from "./routes";

const app = express();
const PORT = process.env.AUTH_PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Auth-service running on port ${PORT}`);
});
