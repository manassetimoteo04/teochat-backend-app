import { Router } from "express";
import { createProject } from "../controllers/createProject/create-project.controller.js";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
import { findProject } from "../controllers/findProject/find-project.controller.js";
import { findProjectByTeam } from "../controllers/findProjectByTeam/find-project-by-team.controller.js";
import { updateProject } from "../controllers/updateProject/update-project.controller.js";
import { deleteProject } from "../controllers/deleteProject/delete-project.controller.js";
const projectRoute = Router();

projectRoute.get("/:id", authorize, findProject);
projectRoute.put("/:id", authorize, updateProject);
projectRoute.delete("/:id/:teamId", authorize, deleteProject);
projectRoute.get("/team/:teamId", authorize, findProjectByTeam);
projectRoute.post("/", authorize, createProject);

export default projectRoute;
