import authContainer from "../../../infrastructure/container/auth-container.js";

export async function requestConfirmCode(req, res, next) {
  try {
    await authContainer.requestConfirmationCode.execute({
      userId: req.user.id,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}
