export class FindTaskByProjectUsecase {
  constructor(repo) {
    this.repo = repo;
  }
  async execute(projectId) {
    return await this.repo.findByProject(projectId);
  }
}
