import { Router } from "express";
import { findInvitation } from "../controllers/findById/find-invitation-by-id.controller.js";
import { createInvitation } from "../controllers/createInvitation/create-invitation.controller.js";
import { findInvitationByCompany } from "../controllers/findByCompanyId/find-by-company.controller.js";
import { acceptInvitation } from "../controllers/acceptInvitation/accept-invitation.controller.js";
import { cancelInvitation } from "../controllers/cancelInvitation/cancel-invitation.controller.js";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";

const invitationRoute = Router();

invitationRoute.get("/:id", authorize, findInvitation);
invitationRoute.get("/company/:id", findInvitationByCompany);
invitationRoute.put("/accept/:id", authorize, acceptInvitation);
invitationRoute.put("/cancel/:id", cancelInvitation);
invitationRoute.post("/:companyId", authorize, createInvitation);

export default invitationRoute;
