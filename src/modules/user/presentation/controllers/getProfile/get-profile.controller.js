import userContainer from "../../../infrastructure/container/user-container.js";

export async function getProfile(req, res, next) {
  try {
    const user = await userContainer.findUserById.execute({ id: req.user.id });
    user.password = undefined;
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}
