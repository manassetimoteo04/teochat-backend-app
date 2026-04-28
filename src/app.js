import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRouter from "./modules/auth/presentation/routes/auth.routes.js";
import companyRoute from "./modules/company/presentation/routes/company.routes.js";
import usersRoute from "./modules/user/presentation/routes/user.routes.js";
import invitationRoute from "./modules/invitation/presentation/routes/invitation.routes.js";
import teamRoutes from "./modules/teams/presentation/routes/team.route.js";
import errorMiddleware from "./modules/shared/infrastructure/middlewares/error.middlewares.js";
import { registerUserSubscribers } from "./modules/user/infrastructure/subscribers/subscribers.js";
import { registerCompanySubscribers } from "./modules/company/infrastructure/subscribers/subscribers.js";
import { registerInvitationSubscribers } from "./modules/invitation/infrastructure/subscribers/subscribers.js";
import eventRoute from "./modules/events/presentation/routes/event.routes.js";
import { registerEventsSubscribers } from "./modules/events/infrastructure/subscribers/subscriber.js";
import { startAgendaJobs } from "./modules/shared/infrastructure/jobs/index.js";
import projectRoute from "./modules/projects/presentation/routes/project.routes.js";
import taskRouter from "./modules/task/presentation/routes/task.route.js";
import { registerTeamssSubscribers } from "./modules/teams/infrastructure/subscribers/index.js";
import channelRouter from "./modules/channels/presentation/routes/channel.routes.js";
import notFoundMiddleware from "./modules/shared/infrastructure/middlewares/not-found.middlewares.js";
import messageRouter from "./modules/messages/presentation/routes/index.js";
import { registerMessageSubscribers } from "./modules/messages/infra/subscribers/index.js";
import meetingRoute from "./modules/meetings/presentation/routes/meeting.routes.js";
import notificationRoute from "./modules/notifications/presentation/routes/notification.routes.js";
import { registerNotificationsSubscribers } from "./modules/notifications/infrastructure/subscribers/index.js";

const app = express();

app.use(
  cors({
    origin: true /*[
      "https://teochat.vercel.app",
      BASE_URL,
      "http://10.105.113.36:5173",
    ],*/,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/users/", usersRoute);
app.use("/api/v1/companies/", companyRoute);
app.use("/api/v1/invitations/", invitationRoute);
app.use("/api/v1/teams/", teamRoutes);
app.use("/api/v1/events/", eventRoute);
app.use("/api/v1/projects/", projectRoute);
app.use("/api/v1/tasks/", taskRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/meetings", meetingRoute);
app.use("/api/v1/notifications", notificationRoute);

app.get("/api/v1/health", (_, res) =>
  res.status(200).json({ message: "BACKEND RUNNIG HEALTHY" }),
);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

registerUserSubscribers();
registerCompanySubscribers();
registerInvitationSubscribers();
registerEventsSubscribers();
registerTeamssSubscribers();
registerMessageSubscribers();
registerNotificationsSubscribers();
startAgendaJobs();
export default app;
