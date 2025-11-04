import { UserAlreadyExistsError } from "../../../shared/infrastructure/errors/error.messages.js";
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

  async execute({ email, password, name }) {
    const userExists = await this.userRepo.findByEmail(email);

    if (userExists) throw new UserAlreadyExistsError();
    const hashedPassword = await this.authService.hashPassword(password);
    const confirmCode = this.generateVerification();

    const confirmExpiresIn = Date.now() + 10 * 60 * 1000;
    console.log(confirmCode);
    const userInstance = new UserEntity({
      name,
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
