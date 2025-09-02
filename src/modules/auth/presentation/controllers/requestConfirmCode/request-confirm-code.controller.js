import { generateVerificationCode } from "../../../../shared/helpers/generate-verification-code.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { RequestConfirmationCodeService } from "../../../usecases/requestConfirmCode/request-code.service.js";
import { eventBus } from "../../../../shared/infrastructure/events/event-bus.js";
const userRepo = new UserMongoRepository();
const generateVerification = generateVerificationCode;

const requestCode = new RequestConfirmationCodeService({
  userRepo,
  generateVerification,
  eventBus,
});
export async function requestConfirmCode(req, res, next) {
  try {
    await requestCode.execute({ userId: req.user.id });

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}
