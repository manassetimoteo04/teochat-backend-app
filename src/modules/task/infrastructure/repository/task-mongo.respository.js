import TaskModel from "../models/task.model.js";
import { TaskEntity } from "../../domain/entities/task.entity.js";
import { ITasksRepository } from "../../domain/interface/task-repository.interface.js";

export class MongoTasksRepository extends ITasksRepository {
  async create(task) {
    const doc = await TaskModel.create({
      projectId: task.projectId,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      assignedTo: task.assignedTo,
      createdBy: task.createdBy,
      tags: task.tags,
    });
    const populated = await this.findById(doc._id);
    return populated;
  }

  async update(task) {
    const existing = await TaskModel.findById(task.id);
    const dueDateChanged =
      String(existing?.dueDate || "") !== String(task.dueDate || "");

    await TaskModel.findByIdAndUpdate(
      task.id,
      {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        assignedTo: task.assignedTo,
        tags: task.tags,
        completedAt: task.completedAt,
        ...(dueDateChanged ? { dueReminderSentAt: null } : {}),
      },
      { new: true },
    );

    return this.findById(task.id);
  }

  async delete(taskId) {
    await TaskModel.findByIdAndDelete(taskId);
  }

  async findById(taskId) {
    const doc = await TaskModel.findById(taskId).populate([
      {
        path: "assignedTo",
        select: "name email avatar",
      },
      {
        path: "createdBy",
        select: "name email avatar",
      },
    ]);
    return doc ? this.toEntity(doc) : null;
  }

  async findByProject(projectId) {
    const docs = await TaskModel.find({ projectId })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "assignedTo",
          select: "name email avatar",
        },
        {
          path: "createdBy",
          select: "name email avatar",
        },
      ]);
    return docs.map((d) => this.toEntity(d));
  }

  async findByAssignedUser(userId) {
    const docs = await TaskModel.find({ assignedTo: userId });
    return docs.map((d) => this.toEntity(d));
  }

  async findOverdue(projectId) {
    const docs = await TaskModel.find({
      projectId,
      dueDate: { $lt: new Date() },
      status: { $ne: "done" },
    });

    return docs.map((d) => this.toEntity(d));
  }

  async findDueSoon(limit = 100) {
    const now = new Date();
    const dueLimit = new Date(now.getTime() + 60 * 60 * 1000);
    const docs = await TaskModel.find({
      dueDate: { $gt: now, $lte: dueLimit },
      status: { $ne: "done" },
      dueReminderSentAt: null,
    })
      .limit(limit)
      .populate([
        {
          path: "assignedTo",
          select: "name email avatar",
        },
        {
          path: "createdBy",
          select: "name email avatar",
        },
      ]);

    return docs.map((d) => this.toEntity(d));
  }

  async markDueReminderSent(taskId, sentAt = new Date()) {
    await TaskModel.findByIdAndUpdate(taskId, {
      dueReminderSentAt: sentAt,
    });
  }

  toEntity(doc) {
    return new TaskEntity({
      id: doc._id.toString(),
      projectId: doc.projectId.toString(),
      title: doc.title,
      description: doc.description,
      status: doc.status,
      priority: doc.priority,
      dueDate: doc.dueDate,
      assignedTo: doc?.assignedTo
        ? {
            id: doc.assignedTo?._id.toString(),
            name: doc.assignedTo?.name,
            avatar: doc.assignedTo?.avatar,
            email: doc.assignedTo?.email,
          }
        : null,
      createdBy: doc?.createdBy
        ? {
            id: doc.createdBy?._id.toString(),
            name: doc.createdBy?.name,
            avatar: doc.createdBy?.avatar,
            email: doc.createdBy?.email,
          }
        : null,
      tags: doc.tags,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      completedAt: doc.completedAt,
      dueReminderSentAt: doc.dueReminderSentAt,
    });
  }
}
