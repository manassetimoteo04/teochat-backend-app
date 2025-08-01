import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { BASE_URL, PORT } from "./configs/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middlewares.js";
import companyRoute from "./routes/company.routes.js";

const app = express();

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/companies/", companyRoute);
app.use(errorMiddleware);
app.listen(PORT, async () => {
  console.log(`🚀 Server running on ${BASE_URL}`);
  await connectToDatabase();
});
