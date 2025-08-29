import { Router } from "express";
import { findInvitation } from "../controllers/findById/find-invitation-by-id.controller.js";
import { createInvitation } from "../controllers/createInvitation/create-invitation.controller.js";
import { findInvitationByCompany } from "../controllers/findByCompanyId/find-by-company.controller.js";
import { acceptInvitation } from "../controllers/acceptInvitation/accept-invitation.controller.js";
import { cancelInvitation } from "../controllers/cancelInvitation/cancel-invitation.controller.js";

const invitationRoute = Router();

invitationRoute.get("/:id", findInvitation);
invitationRoute.get("/company/:id", findInvitationByCompany);
invitationRoute.put("/accept/:id", acceptInvitation);
invitationRoute.put("/cancel/:id", cancelInvitation);
invitationRoute.post("/", createInvitation);

export default invitationRoute;
