import { EmailOrPasswordInvalidError } from "../../../shared/infrastructure/errors/error.messages.js";

export class SignInService {
  constructor({ userRepo, authService, jwtService }) {
    this.userRepo = userRepo;
    this.authService = authService;
    this.jwtService = jwtService;
  }

  async execute({ email, password }) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new EmailOrPasswordInvalidError();
    const valid = await this.authService.comparePasswords(
      password,
      user.password
    );
    if (!valid) throw new EmailOrPasswordInvalidError();

    const token = this.jwtService.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    return { token, user };
  }
}
