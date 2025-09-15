import {
  NotProjectTeamError,
  ProjectNotFoundError,
  TeamNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class UpdateProjectService {
  constructor({ projectRepo, teamRepo }) {
    this.projectRepo = projectRepo;
    this.teamRepo = teamRepo;
  }
  async execute({ id, teamId, ...restData }) {
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();
    const project = await this.projectRepo.findById(id);
    if (!project) throw new ProjectNotFoundError();
    if (!project.isTeam(teamId)) throw new NotProjectTeamError();

    const updated = await this.projectRepo.update(id, restData);
    return updated;
  }
}
