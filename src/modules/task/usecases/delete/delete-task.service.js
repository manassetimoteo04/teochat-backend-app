import {
  NotTaskCreatorError,
  TaskNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";
import { TaskDeletedEvent } from "../../domain/events/task-deleted/index.js";

export class DeleteTaskUseCase {
  constructor({ repo, eventBus, projectRepo, teamRepo, userRepo }) {
    this.repo = repo;
    this.eventBus = eventBus;
    this.projectRepo = projectRepo;
    this.teamRepo = teamRepo;
    this.userRepo = userRepo;
  }

  async execute(userId, taskId) {
    const task = await this.validate(userId, taskId);
    await this.repo.delete(taskId);

    const actor = await this.userRepo.findById(userId);
    const project = await this.projectRepo.findById(task.projectId);
    const team = project ? await this.teamRepo.findById(project.teamId) : null;

    this.eventBus.emit(
      "TaskDeleted",
      new TaskDeletedEvent({
        taskId: task.id,
        title: task.title,
        projectId: project?.id?.toString?.() || task.projectId?.toString(),
        projectName: project?.name,
        teamId: project?.teamId?.toString?.() || team?.id,
        teamName: team?.name,
        companyId: team?.companyId?.toString?.(),
        actor,
        assignedTo: task.assignedTo || null,
        createdBy: task.createdBy || null,
      }),
    );
  }

  async validate(userId, taskId) {
    const task = await this.repo.findById(taskId);
    if (!task) throw new TaskNotFoundError();
    const isCreator = task.isCreatedBy(userId);
    if (!isCreator) {
      throw new NotTaskCreatorError();
    }
    return task;
  }
}
