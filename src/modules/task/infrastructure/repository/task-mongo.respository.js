import TaskModel from "../models/task.model.js";
import { TaskEntity } from "../../domain/entities/task.entity.js";
import { ITasksRepository } from "../../domain/interface/task-repository.interface.js";

export class MongoTasksRepository extends ITasksRepository {
  async create(task) {
    await TaskModel.create({
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
  }

  async update(task) {
    const doc = await TaskModel.findByIdAndUpdate(
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
      },
      { new: true },
    );

    console.log(doc);
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
            avatar: doc.assignedTo?.email.avatar,
            email: doc.assignedTo.avatar,
          }
        : null,
      createdBy: {
        id: doc.createdBy?._id.toString(),
        name: doc.createdBy?.name,
        avatar: doc.createdBy?.email.avatar,
        email: doc.createdBy.avatar,
      },
      tags: doc.tags,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      completedAt: doc.completedAt,
    });
  }
}
