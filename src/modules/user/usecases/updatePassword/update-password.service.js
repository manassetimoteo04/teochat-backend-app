import { InvalidPasswordError, UserNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class UpdatePasswordService {
  constructor({ userRepo, authService }) {
    this.userRepo = userRepo;
    this.authService = authService;
  }

  async execute({ userId, currentPassword, newPassword }) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();
    if (!currentPassword || !newPassword) {
      throw new InvalidPasswordError(
        "Informe a palavra-passe atual e a nova palavra-passe.",
      );
    }

    const matches = await this.authService.comparePasswords(
      currentPassword,
      user.password,
    );

    if (!matches) throw new InvalidPasswordError();

    const password = await this.authService.hashPassword(newPassword);
    await this.userRepo.update(userId, { password });

    return { success: true };
  }
}
