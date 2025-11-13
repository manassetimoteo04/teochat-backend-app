import { TeamNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";
import { ProjectEntity } from "../../domain/entities/projects.entity.js";

export class CreateTeamService {
  constructor({ projectRepo, teamRepo, userRepo }) {
    this.projectRepo = projectRepo;
    this.teamRepo = teamRepo;
    this.userRepo = userRepo;
  }
  async execute({ teamId, userId, tags, ...restData }) {
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();
    const isTags = Array.isArray(tags)
      ? tags
      : tags.split(",").map((tag) => tag.trim());
    const project = new ProjectEntity({
      ...restData,
      teamId,
      tags: isTags,
      createdBy: userId,
    });
    const createdProject = await this.projectRepo.create(project);
    return createdProject;
  }
}
