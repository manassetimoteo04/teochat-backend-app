import notificationContainer from "../../../infrastructure/container/notification-container.js";

export async function getUnreadNotificationsCount(req, res, next) {
  try {
    const data = await notificationContainer.getUnreadNotificationsCount.execute({
      userId: req.user.id,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
