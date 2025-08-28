import { UserEntity } from "../../domain/entities/user.entity";

export class CreateUserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute(data) {
    const userExists = await this.userRepo.findByEmail(data.email);
    if (userExists) throw new Error("Usuário com este email já existe");
    const user = new UserEntity({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return await this.userRepo.create(user);
  }
}
