export class signInService {
  constructor({ userRepo, authService, jwtService }) {
    this.userRepo = userRepo;
    this.authService = authService;
    this.jwtService = jwtService;
  }

  async execute({ email, password }) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("Usuário não encontrado");
    const valid = await this.authService.comparePasswords(
      password,
      user.password
    );
    if (!valid) throw new Error("Senha inválida");

    const accessToken = this.jwtService.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = this.jwtService.generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    return { accessToken, refreshToken, user };
  }
}
