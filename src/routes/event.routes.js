import { Router } from "express";
import { authorize } from "../middlewares/auth.middlewares.js";
import {
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
} from "../controllers/event.controller.js";

const eventRoutes = Router();
eventRoutes.get("/:eventId", authorize, getEvent);
eventRoutes.post("/", authorize, createEvent);
eventRoutes.patch("/:eventId", authorize, updateEvent);
eventRoutes.delete("/:eventId", authorize, deleteEvent);

export default eventRoutes;
