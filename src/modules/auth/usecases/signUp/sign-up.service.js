import { UserEntity } from "../../../user/domain/entities/user.entity.js";
import { UserCreatedEvent } from "../../../user/domain/events/userCreated/user-created-event.js";

export class SignUpService {
  constructor({
    userRepo,
    authService,
    jwtService,
    generateVerification,
    eventBus,
  }) {
    this.userRepo = userRepo;
    this.authService = authService;
    this.jwtService = jwtService;
    this.eventBus = eventBus;
    this.generateVerification = generateVerification;
  }

  async execute({ email, password, name, avatar }) {
    const userExists = await this.userRepo.findByEmail(email);
    if (userExists)
      throw new Error("Já existe uma conta cadastrada com este email");
    const hashedPassword = await this.authService.hashPassword(password);
    const confirmCode = this.generateVerification();
    const confirmExpiresIn = Date.now() + 10 * 60 * 1000;
    const userInstance = new UserEntity({
      name,
      avatar,
      email,
      confirmCode,
      confirmExpiresIn,
      password: hashedPassword,
    });
    const user = await this.userRepo.create(userInstance);
    const token = this.jwtService.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const event = new UserCreatedEvent({ ...user, confirmCode });
    this.eventBus.emit(event.name, event);
    return { user, token };
  }
}
