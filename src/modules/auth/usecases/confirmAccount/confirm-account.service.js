import {
  ExpiredConfirmCodeError,
  InvalidConfirmCodeError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class ConfirmAccountService {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }
  async execute({ code, userId }) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();
    if (!user.isCodeValid(code)) throw new InvalidConfirmCodeError();
    if (user.isCodeExpired()) throw new ExpiredConfirmCodeError();
    user.isConfirmed = true;
    user.confirmCode = undefined;
    user.confirmExpiresIn = undefined;
    const updatedUser = await this.userRepo.update(user.id, user);
    return { user: updatedUser };
  }
}
