import { Router } from "express";
import { createEvent } from "../controllers/createEvent/create-event.controller.js";
const eventRoute = Router();

eventRoute.post("/", createEvent);

export default eventRoute;
