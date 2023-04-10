import express from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRouter.js";

config();
const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(process.env.PORT, (req, res) => {
    console.log("BD connected & running on port ", process.env.PORT);
  });
} catch (err) {
  console.log(err);
}
