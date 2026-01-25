import { JWT_COOKIE_EXPIRES_IN } from "../../../../../configs/env.js";
import authContainer from "../../../infrastructure/container/auth-container.js";

export async function signInUser(req, res, next) {
  try {
    const { user, token } = await authContainer.signIn.execute(req.body);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, data: { user, token } });
  } catch (err) {
    next(err);
  }
}
