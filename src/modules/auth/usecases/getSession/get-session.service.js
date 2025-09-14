import { UserNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class GetSessionService {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }
  async execute({ userId }) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();
    user.password = undefined;
    return user;
  }
}
