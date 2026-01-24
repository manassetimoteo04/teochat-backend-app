import {
  NotProjectTeamError,
  ProjectNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindProjectByIdService {
  constructor({ projectRepo, teamRepo }) {
    this.projectRepo = projectRepo;
    this.teamRepo = teamRepo;
  }
  async execute({ id, teamId }) {
    const project = await this.projectRepo.findById(id);
    if (!project) throw new ProjectNotFoundError();
    if (!project.isTeam(teamId)) throw new NotProjectTeamError();
    return project;
  }
}
