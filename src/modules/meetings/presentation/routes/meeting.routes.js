import { Router } from "express";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
import { generateStreamToken } from "../controllers/generateStreamToken/generate-stream-token.controller.js";
import { listTeamCalls } from "../controllers/listTeamCalls/list-team-calls.controller.js";

const meetingRoute = Router();

meetingRoute.post("/stream/token", authorize, generateStreamToken);
meetingRoute.get("/teams/:teamId/calls", authorize, listTeamCalls);

export default meetingRoute;
