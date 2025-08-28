import { UserEntity } from "../../../user/domain/entities/user.entity.js";

export class ConfirmAccountService {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }
  async execute({ code, id }) {
    const userExists = await this.userRepo.findById(id);
    userExists.confirmAccount(code);
    const user = new UserEntity({
      ...userExists,
      isConfirmed: true,
      confirmCode: undefined,
      confirmExpiresIn: undefined,
    });
    const updatedUser = await this.userRepo.update(user.id, user);
    return { user: updatedUser };
  }
}
