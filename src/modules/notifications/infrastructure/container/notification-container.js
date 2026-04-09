import { CreateNotificationService } from "../../usecases/create/create-notification.service.js";
import { DeleteAllNotificationsService } from "../../usecases/delete-all/delete-all-notifications.service.js";
import { DeleteNotificationService } from "../../usecases/delete/delete-notification.service.js";
import { ListNotificationsService } from "../../usecases/list/list-notifications.service.js";
import { ReadAllNotificationsService } from "../../usecases/read-all/read-all-notifications.service.js";
import { ReadNotificationService } from "../../usecases/read/read-notification.service.js";
import { GetUnreadNotificationsCountService } from "../../usecases/unread-count/get-unread-notifications-count.service.js";
import { NotificationMongoRepository } from "../repositories/notification-mongo.repository.js";

const notificationRepo = new NotificationMongoRepository();

const createNotification = new CreateNotificationService({ notificationRepo });
const listNotifications = new ListNotificationsService({ notificationRepo });
const readNotification = new ReadNotificationService({ notificationRepo });
const readAllNotifications = new ReadAllNotificationsService({
  notificationRepo,
});
const deleteNotification = new DeleteNotificationService({ notificationRepo });
const deleteAllNotifications = new DeleteAllNotificationsService({
  notificationRepo,
});
const getUnreadNotificationsCount = new GetUnreadNotificationsCountService({
  notificationRepo,
});

export default {
  createNotification,
  listNotifications,
  readNotification,
  readAllNotifications,
  deleteNotification,
  deleteAllNotifications,
  getUnreadNotificationsCount,
};
