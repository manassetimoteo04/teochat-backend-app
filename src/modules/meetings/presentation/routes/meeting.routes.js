import { Router } from "express";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
import { generateStreamToken } from "../controllers/generateStreamToken/generate-stream-token.controller.js";

const meetingRoute = Router();

meetingRoute.post("/stream/token", authorize, generateStreamToken);

export default meetingRoute;
