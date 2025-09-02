import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import agendaRoutes from "./routes/agenda.routes.js";
import eventRoutes from "./routes/event.routes.js";
import messageRoutes from "./routes/message.routes.js";

import { BASE_URL } from "./configs/env.js";
import authRouter from "./modules/auth/presentation/routes/auth.routes.js";
import companyRoute from "./modules/company/presentation/routes/company.routes.js";
import usersRoute from "./modules/user/presentation/routes/user.routes.js";
import invitationRoute from "./modules/invitation/presentation/routes/invitation.routes.js";
import teamRoutes from "./modules/teams/presentation/routes/team.route.js";
import errorMiddleware from "./modules/shared/infrastructure/middlewares/error.middlewares.js";
import { registerUserSubscribers } from "./modules/user/infrastructure/subscribers/subscribers.js";
import { registerCompanySubscribers } from "./modules/company/infrastructure/subscribers/subscribers.js";

const app = express();

app.use(
  cors({
    origin: [BASE_URL, "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
registerUserSubscribers();
registerCompanySubscribers();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/users/", usersRoute);
app.use("/api/v1/companies/", companyRoute);
app.use("/api/v1/invitations/", invitationRoute);
app.use("/api/v1/teams/", teamRoutes);
app.use("/api/v1/agendas/", agendaRoutes);
app.use("/api/v1/events/", eventRoutes);
app.use("/api/v1/messages/", messageRoutes);
app.use(errorMiddleware);

export default app;
