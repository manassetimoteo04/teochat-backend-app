import { JWT_EXPIRES_IN, JWT_SECRET } from "../../../../../configs/env.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { AuthService } from "../../../domain/auth.service.js";
import { JwtService } from "../../../infrastructure/jwt.service.js";
import { signInService } from "../../../usecases/signIn/sign-in.service.js";
const authService = new AuthService();
const jwtService = new JwtService(JWT_SECRET, JWT_EXPIRES_IN);
const userRepo = new UserMongoRepository();
const signIn = new signInService({ userRepo, authService, jwtService });
export async function signInUser(req, res, next) {
  try {
    const user = await signIn.execute(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
