import notificationContainer from "../../../infrastructure/container/notification-container.js";

export async function listNotifications(req, res, next) {
  try {
    const data = await notificationContainer.listNotifications.execute({
      userId: req.user.id,
      page: req.query.page,
      limit: req.query.limit,
      status: req.query.status,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
