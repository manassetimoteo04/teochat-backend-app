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
      createdBy: {
        id: doc.createdBy._id,
        name: doc.createdBy.name,
        email: doc.createdBy.email,
        avatar: doc.createdBy.avatar,
      },
      updatedAt: doc.updatedAt,
      tags: doc.tags,
      teamId: doc.teamId,
      startDate: doc.startDate,
      endDate: doc.endDate,
      photo: doc.photo,
    });
  }
  async findByTeamId(teamId, options = {}) {
    const {
      query,
      status,
      dateRange,
      sort = "createdat_desc",
      page = 1,
      limit = 20,
    } = options;

    const filter = { teamId };

    if (typeof query === "string" && query.trim() !== "") {
      const safeQuery = escapeRegex(query.trim());
      filter.name = { $regex: safeQuery, $options: "i" };
    }

    if (typeof status === "string" && status.trim() !== "") {
      filter.status = status.trim();
    }

    if (dateRange?.startUtc && dateRange?.endUtc) {
      filter.createdAt = { $gte: dateRange.startUtc, $lte: dateRange.endUtc };
    }

    const sortDirection = sort === "createdat_asc" ? 1 : -1;
    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      Project.find(filter)
        .sort({ createdAt: sortDirection })
        .skip(skip)
        .limit(limit)
        .populate({
          path: "createdBy",
          select: "name avatar email tags",
        }),
      Project.countDocuments(filter),
    ]);

    return {
      data: docs.map(
        (doc) =>
          new ProjectEntity({
            id: doc._id,
            name: doc.name,
            description: doc.description,
            createdAt: doc.createdAt,
            createdBy: {
              id: doc.createdBy._id,
              name: doc.createdBy.name,
              email: doc.createdBy.email,
              avatar: doc.createdBy.avatar,
            },
            updatedAt: doc.updatedAt,
            tags: doc.tags,
            teamId: doc.teamId,
            startDate: doc.startDate,
            endDate: doc.endDate,
            photo: doc.photo,
          })
      ),
      total,
    };
  }
  async findTaks(id) {}
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
