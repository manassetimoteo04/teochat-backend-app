export class FindUserByIdService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute(data) {
    const user = await this.userRepo.findById(data.id);
    return user;
  }
}
