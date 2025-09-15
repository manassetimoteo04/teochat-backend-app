import { ProjectEntity } from "../../domain/entities/projects.entity.js";
import { IProjectRepository } from "../../domain/interface/project.repository.js";
import Project from "../models/projects.model.js";

export class ProjectMongoRepository extends IProjectRepository {
  async create(data) {
    const doc = await Project.create(data);
    return new ProjectEntity({
      id: doc._id,
      name: doc.name,
      description: doc.description,
      createdAt: doc.createdAt,
      createdBy: doc.createdBy,
      updatedAt: doc.updatedAt,
      tags: doc.tags,
      teamId: doc.teamId,
      startDate: doc.startDate,
      endDate: doc.endDate,
      photo: doc.photo,
    });
  }
  async update(id, updateData) {
    const doc = await Project.findByIdAndUpdate(id, updateData, { new: true });
    if (!doc) return null;
    return new ProjectEntity({
      id: doc._id,
      name: doc.name,
      description: doc.description,
      createdAt: doc.createdAt,
      createdBy: doc.createdBy,
      updatedAt: doc.updatedAt,
      tags: doc.tags,
      teamId: doc.teamId,
      startDate: doc.startDate,
      endDate: doc.endDate,
      photo: doc.photo,
    });
  }
  async delete(id) {
    await Project.findByIdAndDelete(id);
  }
  async findById(id) {
    const doc = await Project.findById(id).populate({
      path: "createdBy",
      select: "name avatar email tags",
    });
    if (!doc) return null;
    return new ProjectEntity({
      id: doc._id,
      name: doc.name,
      description: doc.description,
      createdAt: doc.createdAt,
      createdBy: doc.createdBy,
      updatedAt: doc.updatedAt,
      tags: doc.tags,
      teamId: doc.teamId,
      startDate: doc.startDate,
      endDate: doc.endDate,
      photo: doc.photo,
    });
  }
  async findByTeamId(teamId) {
    const docs = await Project.find({ teamId }).populate({
      path: "createdBy",
      select: "name avatar email tags",
    });

    return docs.map(
      (doc) =>
        new ProjectEntity({
          id: doc._id,
          name: doc.name,
          description: doc.description,
          createdAt: doc.createdAt,
          createdBy: doc.createdBy,
          updatedAt: doc.updatedAt,
          tags: doc.tags,
          teamId: doc.teamId,
          startDate: doc.startDate,
          endDate: doc.endDate,
          photo: doc.photo,
        })
    );
  }
  async findTaks(id) {}
}
