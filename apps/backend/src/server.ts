import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import playersRoutes from "./routes/players";
import seasonsRoutes from "./routes/seasons";
import { setup, serve } from 'swagger-ui-express';
import swaggerSpec from 'swagger-jsdoc';
import swaggerOptions from "./swaggerConfig";

const app = express();
const prisma = new PrismaClient();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/players", playersRoutes);
app.use("/api/v1/seasons", seasonsRoutes);

app.use('/api-docs', serve, setup(swaggerSpec(swaggerOptions)));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  console.log(`Your API docs is running on http://localhost:${PORT}/api-docs`);
});

export { prisma };
