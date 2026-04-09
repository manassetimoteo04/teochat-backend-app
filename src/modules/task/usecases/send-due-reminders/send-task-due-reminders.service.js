import { TaskDueReminderEvent } from "../../domain/events/task-due-reminder/index.js";

export class SendTaskDueRemindersService {
  constructor({ repo, projectRepo, teamRepo }) {
    this.repo = repo;
    this.projectRepo = projectRepo;
    this.teamRepo = teamRepo;
  }

  async execute({ eventBus }) {
    const tasks = await this.repo.findDueSoon();

    for (const task of tasks) {
      const project = await this.projectRepo.findById(task.projectId);
      const team = project ? await this.teamRepo.findById(project.teamId) : null;

      eventBus.emit(
        "TaskDueReminder",
        new TaskDueReminderEvent({
          taskId: task.id,
          title: task.title,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
          projectId: project?.id?.toString?.() || task.projectId?.toString(),
          projectName: project?.name,
          teamId: project?.teamId?.toString?.() || team?.id,
          teamName: team?.name,
          companyId: team?.companyId?.toString?.(),
          assignedTo: task.assignedTo || null,
          createdBy: task.createdBy || null,
        }),
      );

      await this.repo.markDueReminderSent(task.id, new Date());
    }

    return tasks.length;
  }
}
