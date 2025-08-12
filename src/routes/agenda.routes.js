import { Router } from "express";
import { authorize } from "../middlewares/auth.middlewares.js";
import {
  getAgendaById,
  getAgendaEvents,
  getTeamAgenda,
} from "../controllers/agenda.controller.js";

const agendaRoutes = Router();

agendaRoutes.get("/:id", authorize, getAgendaById);
agendaRoutes.get("/:teamId/team", authorize, getTeamAgenda);
agendaRoutes.get("/:agendaId/events", authorize, getAgendaEvents);

export default agendaRoutes;
