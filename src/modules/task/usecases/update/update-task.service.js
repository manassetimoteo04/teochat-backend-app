export class UpdateTaskUsecase {
  constructor(repo) {
    this.repo = repo;
  }

  async execute(task) {
    return await this.repo.update(task);
  }
}
