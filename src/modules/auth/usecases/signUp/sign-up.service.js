import { UserEntity } from "../../../user/domain/entities/user.entity.js";

export class SignUpService {
  constructor({ userRepo, authService, jwtService }) {
    this.userRepo = userRepo;
    this.authService = authService;
    this.jwtService = jwtService;
  }

  async execute({ email, password, name }) {
    const userExists = await this.userRepo.findByEmail(email);
    if (userExists) throw new Error("Usuário não encontrado");
    const hashedPassword = await this.authService.hashPassword(password);
    const userInstance = new UserEntity({
      id: null,
      name,
      email,
      password: hashedPassword,
    });
    const user = await this.userRepo.create(userInstance);
    const accessToken = this.jwtService.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = this.jwtService.generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    return { user, accessToken, refreshToken };
  }
}
