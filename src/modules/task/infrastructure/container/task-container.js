import { CreateTaskUsecase } from "../../usecases/create/create-task.service.js";
import { FindTaskByProjectUsecase } from "../../usecases/find-by-project/find-task-by-project.service.js";
import { UpdateTaskUsecase } from "../../usecases/update/update-task.service.js";
import { MongoTasksRepository } from "../repository/task-mongo.respository.js";

const tasksRepo = new MongoTasksRepository();

const createTask = new CreateTaskUsecase(tasksRepo);
const findTaskByProject = new FindTaskByProjectUsecase(tasksRepo);
const updateTask = new UpdateTaskUsecase(tasksRepo);
export default {
  createTask,
  findTaskByProject,
  updateTask,
};
