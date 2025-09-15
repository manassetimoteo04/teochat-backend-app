import { ProjectNotFoundError } from "../../../shared/infrastructure/errors/error.messages";

export class FindProjectByIdService {
  constructor({ projectRepo }) {
    this.projectRepo = projectRepo;
  }
  async execute({ userId, id }) {
    const project = await this.projectRepo.findById(id);
    if (!project) throw new ProjectNotFoundError();
    return project;
  }
}
