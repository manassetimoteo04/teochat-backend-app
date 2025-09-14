import { Router } from "express";
import { createEvent } from "../controllers/createEvent/create-event.controller.js";
import { findEvent } from "../controllers/findEventById/find-event.controller.js";
import { findEventByTeam } from "../controllers/findByTeamId/find-by-team-id.js";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
import { updateEvent } from "../controllers/updateEvent/update-event.controller.js";
import { cancelEvent } from "../controllers/cancelEvent/cancel-event.controller.js";
const eventRoute = Router();

eventRoute.get("/:id", findEvent);
eventRoute.get("/team/:teamId", findEventByTeam);
eventRoute.post("/", authorize, createEvent);
eventRoute.put("/:id", authorize, updateEvent);
eventRoute.put("/:id/cancel", authorize, cancelEvent);

export default eventRoute;
