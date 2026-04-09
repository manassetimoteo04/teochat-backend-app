import notificationContainer from "../../../infrastructure/container/notification-container.js";

export async function deleteNotification(req, res, next) {
  try {
    const data = await notificationContainer.deleteNotification.execute({
      id: req.params.id,
      userId: req.user.id,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
