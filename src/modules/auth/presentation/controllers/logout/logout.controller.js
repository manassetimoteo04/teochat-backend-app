import authContainer from "../../../infrastructure/container/auth-container.js";

export async function logoutUser(req, res, next) {
  try {
    await authContainer.logout.execute();
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    next(err);
  }
}
