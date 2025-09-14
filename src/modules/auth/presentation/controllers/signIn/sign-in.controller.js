import { JWT_COOKIE_EXPIRES_IN } from "../../../../../configs/env.js";
import authContainer from "../../../infrastructure/container/auth-container.js";

export async function signInUser(req, res, next) {
  try {
    const { user, token } = await authContainer.signIn.execute(req.body);
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
