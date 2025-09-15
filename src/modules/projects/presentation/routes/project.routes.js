import { Router } from "express";
import { createProject } from "../controllers/createProject/create-project.controller.js";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
const projectRoute = Router();

// projectRoute.get("/:id",());
projectRoute.post("/", authorize, createProject);

export default projectRoute;
