import authContainer from "../../../infrastructure/container/auth-container.js";

export async function confirmUserAccount(req, res, next) {
  try {
    const user = await authContainer.confirmAccount.execute({
      ...req.body,
      userId: req.user.id,
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
}
