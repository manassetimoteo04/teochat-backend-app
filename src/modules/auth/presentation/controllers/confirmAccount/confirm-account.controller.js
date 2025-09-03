import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { ConfirmAccountService } from "../../../usecases/confirmAccount/confirm-account.service.js";
import { eventBus } from "../../../../shared/infrastructure/events/event-bus.js";
const userRepo = new UserMongoRepository();
const confirmAccount = new ConfirmAccountService({ userRepo, eventBus });
export async function confirmUserAccount(req, res, next) {
  try {
    const user = await confirmAccount.execute({
      ...req.body,
      userId: req.user.id,
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
}
