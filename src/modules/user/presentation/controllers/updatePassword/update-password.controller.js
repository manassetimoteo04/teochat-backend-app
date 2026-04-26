import userContainer from "../../../infrastructure/container/user-container.js";

export async function updatePassword(req, res, next) {
  try {
    const result = await userContainer.updatePassword.execute({
      userId: req.user.id,
      ...req.body,
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}
