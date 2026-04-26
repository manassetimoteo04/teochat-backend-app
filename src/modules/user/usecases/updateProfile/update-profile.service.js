import { UserAlreadyExistsError, UserNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class UpdateProfileService {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  async execute({ userId, name, email, avatar }) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();

    const nextEmail = email?.trim()?.toLowerCase();
    if (nextEmail && nextEmail !== user.email) {
      const emailOwner = await this.userRepo.findByEmail(nextEmail);
      if (emailOwner && emailOwner.id !== userId) {
        throw new UserAlreadyExistsError("Este email já está a ser usado por outro utilizador.");
      }
    }

    const updatedUser = await this.userRepo.update(userId, {
      ...(name ? { name } : {}),
      ...(nextEmail ? { email: nextEmail } : {}),
      ...(avatar ? { avatar } : {}),
    });

    updatedUser.password = undefined;
    return updatedUser;
  }
}
