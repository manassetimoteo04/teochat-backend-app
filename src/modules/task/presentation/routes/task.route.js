import { Router } from "express";
import { createTask } from "../controllers/create-task/create-task.controller";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares";
import { findTaskByProject } from "../controllers/find-task-by-project/find-task-by-project.controller";
import { updateTask } from "../controllers/update-task/update.task.controller";
import { deleteTask } from "../controllers/delete-task/delete-task-controller";

const taskRouter = Router();

taskRouter.post("/:projectId", authorize, createTask);
taskRouter.get("/:projectId", authorize, findTaskByProject);
taskRouter.put("/:id", authorize, updateTask);
taskRouter.delete("/:id", authorize, deleteTask);

export default taskRouter;
