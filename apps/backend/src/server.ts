import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import playersRoutes from "./routes/players";
import seasonsRoutes from "./routes/seasons";

const app = express();
const prisma = new PrismaClient();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/players", playersRoutes);
app.use("/api/v1/seasons", seasonsRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { prisma };
