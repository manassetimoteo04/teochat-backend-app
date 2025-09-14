import { JWT_EXPIRES_IN, JWT_SECRET } from "../../../../configs/env.js";
import { generateVerificationCode } from "../../../shared/helpers/generate-verification-code.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import UserMongoRepository from "../../../user/infrastructure/repositories/user.mongo.repository.js";
import { AuthService } from "../../domain/auth.service.js";
import { ConfirmAccountService } from "../../usecases/confirmAccount/confirm-account.service.js";
import { GetSessionService } from "../../usecases/getSession/get-session.service.js";
import { RequestConfirmationCodeService } from "../../usecases/requestConfirmCode/request-code.service.js";
import { SignInService } from "../../usecases/signIn/sign-in.service.js";
import { SignUpService } from "../../usecases/signUp/sign-up.service.js";
import { JwtService } from "../jwt.service.js";

const authService = new AuthService();
const jwtService = new JwtService(JWT_SECRET, JWT_EXPIRES_IN);
const userRepo = new UserMongoRepository();
const generateVerification = generateVerificationCode;

const signIn = new SignInService({ userRepo, authService, jwtService });
const signUp = new SignUpService({
  userRepo,
  authService,
  jwtService,
  generateVerification,
  eventBus,
});
const requestConfirmationCode = new RequestConfirmationCodeService({
  userRepo,
  generateVerification,
  eventBus,
});

const getCurrentSession = new GetSessionService({
  userRepo,
});
const confirmAccount = new ConfirmAccountService({ userRepo, eventBus });
export default {
  signUp,
  signIn,
  requestConfirmationCode,
  getCurrentSession,
  confirmAccount,
};
