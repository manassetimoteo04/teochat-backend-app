import { Router } from "express";
import { createTeam } from "../controllers/createTeam/create-team.controller.js";

const teamRoutes = Router();

teamRoutes.post("/", createTeam);

export default teamRoutes;
