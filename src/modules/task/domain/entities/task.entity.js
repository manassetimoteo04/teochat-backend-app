export class TaskEntity {
  constructor({
    id,
    projectId,
    title,
    description,
    status, // "todo" | "in_progress" | "done"
    priority, // "low" | "medium" | "high"
    dueDate,
    assignedTo, // userId
    createdBy,
    tags,
    createdAt,
    updatedAt,
    completedAt,
  }) {
    this.id = id;
    this.projectId = projectId;
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.dueDate = dueDate;
    this.assignedTo = assignedTo;
    this.createdBy = createdBy;
    this.tags = tags || [];
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.completedAt = completedAt;
  }

  isFromProject(projectId) {
    return this.projectId.toString() === projectId;
  }

  isAssignedTo(userId) {
    return this.assignedTo?.toString() === userId;
  }

  isOverdue() {
    if (!this.dueDate || this.isDone()) return false;
    return new Date(this.dueDate) < new Date();
  }

  isDone() {
    return this.status === "done";
  }

  canBeEditedBy(userId) {
    return (
      this.createdBy.toString() === userId ||
      this.assignedTo?.toString() === userId
    );
  }

  markAsDone() {
    this.status = "done";
    this.completedAt = new Date();
  }

  moveTo(status) {
    this.status = status;
  }
}
