import { Router } from "express";
import { createEvent } from "../controllers/createEvent/create-event.controller.js";
import { findEvent } from "../controllers/findEventById/find-event.controller.js";
import { findEventByTeam } from "../controllers/findByTeamId/find-by-team-id.js";
const eventRoute = Router();

eventRoute.get("/:id", findEvent);
eventRoute.get("/team/:teamId", findEventByTeam);
eventRoute.post("/", createEvent);

export default eventRoute;
