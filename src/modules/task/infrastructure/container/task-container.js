import { CreateTaskUsecase } from "../../usecases/create/create-task.service";
import { MongoTasksRepository } from "../repository/task-mongo.respository";

const tasksRepo = new MongoTasksRepository();

const createTask = new CreateTaskUsecase(tasksRepo);

export default {
  createTask,
};
