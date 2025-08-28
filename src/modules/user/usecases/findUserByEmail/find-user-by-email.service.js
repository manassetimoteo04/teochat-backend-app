import { UserEntity } from "../../domain/entities/user.entity";

export class FindUserByEmailService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute(data) {
    const result = await this.userRepo.findByEmail(data.email);
    const user = new UserEntity({
      id: result.id,
      name: result.name,
      email: result.email,
      password: result.password,
    });
    return user;
  }
}
