import { eventBus } from "../../../../shared/infrastructure/events/event-bus.js";
import UserMongoRepository from "../../../infra/repositories/user.mongo.repository.js";
import { CreateUserService } from "../../../usecases/createUser/create-user.service.js";

const userRepo = new UserMongoRepository();
const createUser = new CreateUserService(userRepo, eventBus);

export async function registerUser(req, res) {
  try {
    const user = await createUser.execute(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
