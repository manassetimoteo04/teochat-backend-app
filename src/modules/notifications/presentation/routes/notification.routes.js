import { Router } from "express";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
import { deleteAllNotifications } from "../controllers/delete-all-notifications/delete-all-notifications.controller.js";
import { deleteNotification } from "../controllers/delete-notification/delete-notification.controller.js";
import { listNotifications } from "../controllers/list-notifications/list-notifications.controller.js";
import { readAllNotifications } from "../controllers/read-all-notifications/read-all-notifications.controller.js";
import { readNotification } from "../controllers/read-notification/read-notification.controller.js";
import { getUnreadNotificationsCount } from "../controllers/unread-count/get-unread-notifications-count.controller.js";

const notificationRoute = Router();

notificationRoute.get("/", authorize, listNotifications);
notificationRoute.get("/unread-count", authorize, getUnreadNotificationsCount);
notificationRoute.patch("/read-all", authorize, readAllNotifications);
notificationRoute.patch("/:id/read", authorize, readNotification);
notificationRoute.delete("/", authorize, deleteAllNotifications);
notificationRoute.delete("/:id", authorize, deleteNotification);

export default notificationRoute;
