import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { ConfirmAccountService } from "../../../usecases/confirmAccount/confirm-account.service.js";
const userRepo = new UserMongoRepository();
const confirmAccount = new ConfirmAccountService({ userRepo });
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
