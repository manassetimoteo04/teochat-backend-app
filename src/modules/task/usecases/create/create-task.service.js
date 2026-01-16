import { TaskEntity } from "../../domain/entities/task.entity";

export class CreateTaskUsecase {
  constructor(repo) {
    this.repo = repo;
  }

  async execute({
    projectId,
    title,
    description,
    priority = "medium",
    dueDate = null,
    assignedTo = null,
    createdBy,
    tags = [],
  }) {
    if (!title || title.trim().length === 0) {
      throw new Error("Task title is required");
    }

    const task = new TaskEntity({
      id: undefined,
      projectId,
      title,
      description,
      status: "todo",
      priority,
      dueDate,
      assignedTo,
      createdBy,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
    });

    return await this.repo.create(task);
  }
}
