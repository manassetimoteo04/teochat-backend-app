export class FindUserByIdService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute(data) {
    const user = await this.userRepo.findById(data.id);
    if (!user) throw new Error("Usuário com este email já existe");
    return user;
  }
}
