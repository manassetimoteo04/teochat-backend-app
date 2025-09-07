import { Router } from "express";
import { createEvent } from "../controllers/createEvent/create-event.controller.js";
import { findEvent } from "../controllers/findEventById/find-event.controller.js";
const eventRoute = Router();

eventRoute.get("/:id", findEvent);
eventRoute.post("/", createEvent);

export default eventRoute;
