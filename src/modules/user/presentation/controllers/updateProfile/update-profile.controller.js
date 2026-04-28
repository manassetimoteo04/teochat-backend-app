import userContainer from "../../../infrastructure/container/user-container.js";

export async function updateProfile(req, res, next) {
  try {
    const user = await userContainer.updateProfile.execute({
      userId: req.user.id,
      ...req.body,
      avatarFile: req.file,
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}
