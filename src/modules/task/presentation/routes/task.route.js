import { Router } from "express";
import { createTask } from "../controllers/create-task/create-task.controller";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares";

const taskRouter = Router();

taskRouter.post("/:projectId", authorize, createTask);

export default taskRouter;
