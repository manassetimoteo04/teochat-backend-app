import {
  JWT_COOKIE_EXPIRES_IN,
  JWT_EXPIRES_IN,
  JWT_SECRET,
} from "../../../../../configs/env.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { AuthService } from "../../../domain/auth.service.js";
import { JwtService } from "../../../infrastructure/jwt.service.js";
import { SignInService } from "../../../usecases/signIn/sign-in.service.js";
const authService = new AuthService();
const jwtService = new JwtService(JWT_SECRET, JWT_EXPIRES_IN);
const userRepo = new UserMongoRepository();
const signIn = new SignInService({ userRepo, authService, jwtService });
export async function signInUser(req, res, next) {
  try {
    const { user, token } = await signIn.execute(req.body);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24,
    });
    res.status(200).json({ success: true, data: { user, token } });
  } catch (err) {
    next(err);
  }
}
