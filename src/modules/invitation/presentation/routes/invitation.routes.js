import { Router } from "express";
import { findInvitation } from "../controllers/findById/find-invitation-by-id.controller.js";
import { createInvitation } from "../controllers/createInvitation/create-invitation.controller.js";

const invitationRoute = Router();

invitationRoute.get("/:id", findInvitation);
invitationRoute.post("/", createInvitation);

export default invitationRoute;
