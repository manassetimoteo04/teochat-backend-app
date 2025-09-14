import { UserEntity } from "../../domain/entities/user.entity";
import { UserCreatedEvent } from "../../domain/events/userCreated/user-created-event";

export class CreateUserService {
  constructor(userRepo, eventBus) {
    this.userRepo = userRepo;
    this.eventBus = eventBus;
  }

  async execute(data) {
    const userExists = await this.userRepo.findByEmail(data.email);
    if (userExists) throw new Error("Usuário com este email já existe");
    const user = new UserEntity({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    const newUser = await this.userRepo.create(user);
    const event = new UserCreatedEvent(newUser);
    this.eventBus.emit(event.name, event);
    return newUser;
  }
}
