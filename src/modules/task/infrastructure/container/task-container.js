import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import { ProjectMongoRepository } from "../../../projects/infrasctruture/repositories/projects-mongo.repository.js";
import { TeamsMongoRepository } from "../../../teams/infrastructure/repositories/team-mongo.repository.js";
import UserMongoRepository from "../../../user/infrastructure/repositories/user.mongo.repository.js";
import { CreateTaskUsecase } from "../../usecases/create/create-task.service.js";
import { DeleteTaskUseCase } from "../../usecases/delete/delete-task.service.js";
import { FindTaskByProjectUsecase } from "../../usecases/find-by-project/find-task-by-project.service.js";
import { SendTaskDueRemindersService } from "../../usecases/send-due-reminders/send-task-due-reminders.service.js";
import { UpdateTaskUsecase } from "../../usecases/update/update-task.service.js";
import { MongoTasksRepository } from "../repository/task-mongo.respository.js";

const tasksRepo = new MongoTasksRepository();
const projectRepo = new ProjectMongoRepository();
const teamRepo = new TeamsMongoRepository();
const userRepo = new UserMongoRepository();

const createTask = new CreateTaskUsecase({
  repo: tasksRepo,
  eventBus,
  projectRepo,
  teamRepo,
  userRepo,
});
const findTaskByProject = new FindTaskByProjectUsecase(tasksRepo);
const updateTask = new UpdateTaskUsecase({
  repo: tasksRepo,
  eventBus,
  projectRepo,
  teamRepo,
  userRepo,
});
const deleteTask = new DeleteTaskUseCase({
  repo: tasksRepo,
  eventBus,
  projectRepo,
  teamRepo,
  userRepo,
});
const sendTaskDueReminders = new SendTaskDueRemindersService({
  repo: tasksRepo,
  projectRepo,
  teamRepo,
});
export default {
  createTask,
  findTaskByProject,
  updateTask,
  deleteTask,
  sendTaskDueReminders,
};
