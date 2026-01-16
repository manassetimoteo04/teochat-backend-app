export class UpdateTaskUsecase {
  constructor(repo) {
    this.repo = repo;
  }

  async execute(task) {
    return this.repo.update(task);
  }
}
