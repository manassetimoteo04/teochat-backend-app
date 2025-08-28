import { JWT_SECRET } from "../../../../../configs/env.js";
import { generateVerificationCode } from "../../../../shared/helpers/generate-verification-code.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { AuthService } from "../../../domain/auth.service.js";
import { JwtService } from "../../../infrastructure/jwt.service.js";
import { SignUpService } from "../../../usecases/signUp/sign-up.service.js";
const authService = new AuthService();
const jwtService = new JwtService(JWT_SECRET);
const userRepo = new UserMongoRepository();
const generateVerification = generateVerificationCode;
const signUp = new SignUpService({
  userRepo,
  authService,
  jwtService,
  generateVerification,
});
export async function signUpUser(req, res, next) {
  try {
    const user = await signUp.execute(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
