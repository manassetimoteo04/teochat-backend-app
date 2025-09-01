import { Router } from "express";
import { createTeam } from "../controllers/createTeam/create-team.controller.js";
import { findTeam } from "../controllers/findTeamById/find-team.controller.js";
import { findTeamByCompany } from "../controllers/findByCompanyId/find-team-by-company.controller.js";
import { findTeamByUserId } from "../controllers/findByUserId/find-team-by-user-id.controller.js";

const teamRoutes = Router();

teamRoutes.post("/", createTeam);
teamRoutes.get("/:id", findTeam);
teamRoutes.get("/company/:companyId", findTeamByCompany);
teamRoutes.get("/user/:companyId", findTeamByUserId);

export default teamRoutes;
