import { UserNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class ConfirmAccountService {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }
  async execute({ code, userId }) {
    const userExists = await this.userRepo.findById(userId);
    if (!userExists) throw new UserNotFoundError();
    userExists.confirmAccount(code);

    const updatedUser = await this.userRepo.update(userExists.id, userExists);
    return { user: updatedUser };
  }
}
