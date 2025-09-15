import { TeamNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";
import { ProjectEntity } from "../../domain/entities/projects.entity";

export class CreateTeamService {
  constructor({ projectRepo, teamRepo, userRepo }) {
    this.projectRepo = projectRepo;
    this.teamRepo = teamRepo;
    this.userRepo = userRepo;
  }
  async execute({ teamId, userId, ...restData }) {
    const team = await this.teamRepo.findById(teamId);
    if (!team) return new TeamNotFoundError();
    const project = new ProjectEntity({
      ...restData,
      teamId,
      createdBy: userId,
    });
    const createdProject = await this.projectRepo.create(project);
    return createdProject;
  }
}
