import {
  ExpiredConfirmCodeError,
  InvalidConfirmCodeError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";
import { UserConfirmedAccountEvent } from "../../../user/domain/events/userConfirmed/user-confirmed-event.js";

export class ConfirmAccountService {
  constructor({ userRepo, eventBus }) {
    this.userRepo = userRepo;
    this.eventBus = eventBus;
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
    const event = new UserConfirmedAccountEvent(updatedUser);
    this.eventBus.emit(event.name, event);
    return { user: updatedUser };
  }
}
