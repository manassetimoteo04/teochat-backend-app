import { UserEntity } from "../../../user/domain/entities/user.entity.js";

export class SignUpService {
  constructor({ userRepo, authService, jwtService, generateVerification }) {
    this.userRepo = userRepo;
    this.authService = authService;
    this.jwtService = jwtService;
    this.generateVerification = generateVerification;
  }

  async execute({ email, password, name }) {
    const userExists = await this.userRepo.findByEmail(email);
    if (userExists)
      throw new Error("Já existe uma conta cadastrada com este email");
    const hashedPassword = await this.authService.hashPassword(password);
    const confirmCode = this.generateVerification();
    const confirmExpiresIn = Date.now() + 10 * 60 * 1000;
    const userInstance = new UserEntity({
      id: null,
      name,
      email,
      confirmCode,
      confirmExpiresIn,
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
