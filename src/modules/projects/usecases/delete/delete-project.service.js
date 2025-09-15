import {
  NotProjectTeamError,
  ProjectNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class DeleteProjectService {
  constructor({ projectRepo }) {
    this.projectRepo = projectRepo;
  }
  async execute({ id, teamId }) {
    const project = await this.projectRepo.findById(id);
    if (!project) throw new ProjectNotFoundError();
    if (!project.isTeam(teamId)) throw new NotProjectTeamError();
    await this.projectRepo.delete(id);
  }
}
