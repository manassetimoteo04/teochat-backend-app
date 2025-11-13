import {
  NotProjectTeamError,
  ProjectNotFoundError,
  TeamNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindProjectByIdService {
  constructor({ projectRepo, teamRepo }) {
    this.projectRepo = projectRepo;
    this.teamRepo = teamRepo;
  }
  async execute({ userId, id, teamId }) {
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();
    if (!project) throw new ProjectNotFoundError();
    if (!project.isTeam(teamId)) throw new NotProjectTeamError();
    const project = await this.projectRepo.findById(id);
    return project;
  }
}
