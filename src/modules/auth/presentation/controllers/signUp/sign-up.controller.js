import {
  JWT_COOKIE_EXPIRES_IN,
  JWT_EXPIRES_IN,
  JWT_SECRET,
} from "../../../../../configs/env.js";
import { generateVerificationCode } from "../../../../shared/helpers/generate-verification-code.js";
import { eventBus } from "../../../../shared/infrastructure/events/event-bus.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { AuthService } from "../../../domain/auth.service.js";
import { JwtService } from "../../../infrastructure/jwt.service.js";
import { SignUpService } from "../../../usecases/signUp/sign-up.service.js";
const authService = new AuthService();
const jwtService = new JwtService(JWT_SECRET, JWT_EXPIRES_IN);
const userRepo = new UserMongoRepository();
const generateVerification = generateVerificationCode;
const signUp = new SignUpService({
  userRepo,
  authService,
  jwtService,
  generateVerification,
  eventBus,
});

export async function signUpUser(req, res, next) {
  try {
    const { user, token } = await signUp.execute(req.body);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24,
    });
    res.status(201).json({ success: true, data: { user, token } });
  } catch (err) {
    next(err);
  }
}
