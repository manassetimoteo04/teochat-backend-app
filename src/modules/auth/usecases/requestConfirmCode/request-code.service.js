import { UserNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";
import { UserEntity } from "../../../user/domain/entities/user.entity.js";
import { UserRequestConfirmCodeEvent } from "../../../user/domain/events/userRequestCode/user-request-confirm-code.js";

export class RequestConfirmationCodeService {
  constructor({ generateVerification, userRepo, eventBus }) {
    this.generateVerification = generateVerification;
    this.userRepo = userRepo;
    this.eventBus = eventBus;
  }
  async execute({ userId }) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();
    const confirmCode = this.generateVerification();
    const confirmExpiresIn = Date.now() + 10 * 60 * 1000;
    const userInstance = new UserEntity({
      ...user,
      confirmCode,
      confirmExpiresIn,
    });
    const updated = await this.userRepo.update(user.id, userInstance);
    const event = new UserRequestConfirmCodeEvent({ ...updated, confirmCode });
    this.eventBus.emit(event.name, event);
  }
}
