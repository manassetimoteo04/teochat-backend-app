import { Router } from "express";
import { createProject } from "../controllers/createProject/create-project.controller.js";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
import { findProject } from "../controllers/findProject/find-project.controller.js";
const projectRoute = Router();

projectRoute.get("/:id", authorize, findProject);
projectRoute.post("/", authorize, createProject);

export default projectRoute;
