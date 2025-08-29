import { Router } from "express";
import { createTeam } from "../controllers/createTeam/create-team.controller.js";
import { findTeam } from "../controllers/findTeamById/find-team.controller.js";

const teamRoutes = Router();

teamRoutes.post("/", createTeam);
teamRoutes.get("/:id", findTeam);

export default teamRoutes;
