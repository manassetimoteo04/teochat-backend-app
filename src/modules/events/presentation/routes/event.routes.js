import { Router } from "express";
import { createEvent } from "../controllers/createEvent/create-event.controller.js";
import { findEvent } from "../controllers/findEventById/find-event.controller.js";
import { findEventByTeam } from "../controllers/findByTeamId/find-by-team-id.js";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
import { updateEvent } from "../controllers/updateEvent/update-event.controller.js";
import { cancelEvent } from "../controllers/cancelEvent/cancel-event.controller.js";
import { findEventByCompanyId } from "../controllers/findByCompanyId/find-by-company.controller.js";
const eventRoute = Router();

eventRoute.get("/:companyId/:id", authorize, findEvent);
eventRoute.get("/:companyId/", authorize, findEventByCompanyId);
eventRoute.get("/:companyId/team/:teamId", authorize, findEventByTeam);
eventRoute.post("/:companyId", authorize, createEvent);
eventRoute.put("/:companyId/:id", authorize, updateEvent);
eventRoute.put("/:companyId/:id/cancel", authorize, cancelEvent);

export default eventRoute;
