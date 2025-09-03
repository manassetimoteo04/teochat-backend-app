import { Router } from "express";
import { createTeam } from "../controllers/createTeam/create-team.controller.js";
import { findTeam } from "../controllers/findTeamById/find-team.controller.js";
import { findTeamByCompany } from "../controllers/findByCompanyId/find-team-by-company.controller.js";
import { findTeamByUserId } from "../controllers/findByUserId/find-team-by-user-id.controller.js";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
const teamRoutes = Router();

teamRoutes.get("/company/:companyId", authorize, findTeamByCompany);
teamRoutes.post("/:companyId", authorize, createTeam);
teamRoutes.get("/:id/:companyId", authorize, findTeam);
teamRoutes.get("/:id", findTeam);
teamRoutes.get("/user/:companyId", findTeamByUserId);

export default teamRoutes;
