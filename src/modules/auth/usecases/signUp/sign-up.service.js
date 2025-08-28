export class SignUpService {
  constructor(userRepo, authService, jwtService) {
    this.userRepo = userRepo;
    this.authService = authService;
    this.jwtService = jwtService;
  }

  async execute({ email, password, name }) {
    const userExists = await this.userRepo.findByEmail(email);
    if (!userExists) throw new Error("Usuário não encontrado");

    const user = await this.userRepo.create();

    return { r };
  }
}
