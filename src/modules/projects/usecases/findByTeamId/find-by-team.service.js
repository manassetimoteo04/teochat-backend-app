import { TeamNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class FindProjectByTeamIdService {
  constructor({ teamRepo, projectRepo }) {
    this.teamRepo = teamRepo;
    this.projectRepo = projectRepo;
  }
  async execute({ teamId }) {
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();
    const projects = await this.projectRepo.findByTeamId(teamId);
    return projects;
  }
}
