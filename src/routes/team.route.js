import { Router } from "express";
import {
  addTeamMember,
  createTeam,
  deteleTeam,
  getCompanyTeams,
  getTeam,
  getTeamParticipants,
  getUserTeams,
  updateTeam,
} from "../controllers/team.controller.js";
import { authorize } from "../middlewares/auth.middlewares.js";

const teamRoutes = Router();

teamRoutes.get("/company/:companyId", authorize, getCompanyTeams);
teamRoutes.get("/:id", authorize, getTeam);
teamRoutes.get("/:id/participants", authorize, getTeamParticipants);
teamRoutes.get("/user/:id", authorize, getUserTeams);
teamRoutes.post("/", authorize, createTeam);
teamRoutes.patch("/:id", authorize, updateTeam);
teamRoutes.put("/:id/add-member/", authorize, addTeamMember);
teamRoutes.delete("/:id", authorize, deteleTeam);

export default teamRoutes;
