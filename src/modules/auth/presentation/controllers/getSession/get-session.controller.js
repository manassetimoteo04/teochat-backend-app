import authContainer from "../../../infrastructure/container/auth-container.js";

export async function getSession(req, res, next) {
  try {
    const user = await authContainer.getCurrentSession.execute({
      userId: req.user.id,
    });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}
