import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { BASE_URL, PORT } from "./configs/env.js";
import connectToDatabase from "./database/mongodb.js";

const app = express();

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.listen(PORT, async () => {
  console.log(`🚀 Server running on ${BASE_URL}`);
  await connectToDatabase();
});
