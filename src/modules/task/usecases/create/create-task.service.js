import { TaskEntity } from "../../domain/entities/task.entity.js";
import { TaskAssignedEvent } from "../../domain/events/task-assigned/index.js";
import { TaskCreatedEvent } from "../../domain/events/task-created/index.js";

export class CreateTaskUsecase {
  constructor({ repo, eventBus, projectRepo, teamRepo, userRepo }) {
    this.repo = repo;
    this.eventBus = eventBus;
    this.projectRepo = projectRepo;
    this.teamRepo = teamRepo;
    this.userRepo = userRepo;
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
    const createdTask = await this.repo.create(task);
    const actor = await this.userRepo.findById(createdBy);
    const project = await this.projectRepo.findById(projectId);
    const team = project ? await this.teamRepo.findById(project.teamId) : null;

    const basePayload = {
      taskId: createdTask.id,
      title: createdTask.title,
      status: createdTask.status,
      priority: createdTask.priority,
      dueDate: createdTask.dueDate,
      projectId: project?.id?.toString?.() || projectId?.toString(),
      projectName: project?.name,
      teamId: project?.teamId?.toString?.() || team?.id,
      teamName: team?.name,
      companyId: team?.companyId?.toString?.(),
      actor,
      assignedTo: createdTask.assignedTo || null,
      createdBy: createdTask.createdBy || actor,
    };

    this.eventBus.emit(
      "TaskCreated",
      new TaskCreatedEvent(basePayload),
    );

    if (createdTask.assignedTo?.id) {
      this.eventBus.emit(
        "TaskAssigned",
        new TaskAssignedEvent({
          ...basePayload,
          assigneeId: createdTask.assignedTo.id,
          previousAssigneeId: null,
        }),
      );
    }

    return createdTask;
  }
}
