import {
  NotTaskCreatorError,
  TaskNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages";

export class DeleteTaskUseCase {
  constructor(repo) {
    this.repo = repo;
  }

  async execute(userId, taskId) {
    await this.validate(userId, taskId);
    await this.repo.delete(taskId);
  }

  async validate(userId, taskId) {
    const task = await this.repo.findById(taskId);
    if (!task) throw new TaskNotFoundError();
    const isCreator = task.isCreatedBy(userId);
    console.log(isCreator, task.createdBy, userId);
    if (!isCreator) {
      throw new NotTaskCreatorError();
    }
  }
}
