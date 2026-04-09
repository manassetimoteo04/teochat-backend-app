import { TaskAssignedEvent } from "../../domain/events/task-assigned/index.js";
import { TaskCompletedEvent } from "../../domain/events/task-completed/index.js";
import { TaskUpdatedEvent } from "../../domain/events/task-updated/index.js";

export class UpdateTaskUsecase {
  constructor({ repo, eventBus, projectRepo, teamRepo, userRepo }) {
    this.repo = repo;
    this.eventBus = eventBus;
    this.projectRepo = projectRepo;
    this.teamRepo = teamRepo;
    this.userRepo = userRepo;
  }

  async execute(task) {
    const previousTask = await this.repo.findById(task.id);
    const updatedTask = await this.repo.update(task);

    if (!updatedTask) return updatedTask;

    const actor = task.updatedBy
      ? await this.userRepo.findById(task.updatedBy)
      : null;
    const project = await this.projectRepo.findById(updatedTask.projectId);
    const team = project ? await this.teamRepo.findById(project.teamId) : null;

    const payload = {
      taskId: updatedTask.id,
      title: updatedTask.title,
      status: updatedTask.status,
      priority: updatedTask.priority,
      dueDate: updatedTask.dueDate,
      previousStatus: previousTask?.status,
      previousDueDate: previousTask?.dueDate,
      projectId: project?.id?.toString?.() || updatedTask.projectId?.toString(),
      projectName: project?.name,
      teamId: project?.teamId?.toString?.() || team?.id,
      teamName: team?.name,
      companyId: team?.companyId?.toString?.(),
      actor,
      assignedTo: updatedTask.assignedTo || null,
      createdBy: updatedTask.createdBy || null,
    };

    this.eventBus.emit("TaskUpdated", new TaskUpdatedEvent(payload));

    const previousAssigneeId = previousTask?.assignedTo?.id?.toString?.() || null;
    const nextAssigneeId = updatedTask?.assignedTo?.id?.toString?.() || null;
    if (nextAssigneeId && nextAssigneeId !== previousAssigneeId) {
      this.eventBus.emit(
        "TaskAssigned",
        new TaskAssignedEvent({
          ...payload,
          assigneeId: nextAssigneeId,
          previousAssigneeId,
        }),
      );
    }

    if (previousTask?.status !== "done" && updatedTask.status === "done") {
      this.eventBus.emit("TaskCompleted", new TaskCompletedEvent(payload));
    }

    return updatedTask;
  }
}
