import { emitNotificationCreated } from "../../../shared/utils/send.notifications.js";

export class CreateNotificationService {
  constructor({ notificationRepo }) {
    this.notificationRepo = notificationRepo;
  }

  async execute(data) {
    const notification = await this.notificationRepo.create(data);
    const unreadCount = await this.notificationRepo.countUnread(notification.userId);
    emitNotificationCreated(notification.userId, notification, unreadCount);
    return notification;
  }

  async executeMany(items = []) {
    const groupedByUser = new Map();
    const notifications = await this.notificationRepo.createMany(items);

    for (const notification of notifications) {
      if (!groupedByUser.has(notification.userId)) {
        groupedByUser.set(notification.userId, []);
      }
      groupedByUser.get(notification.userId).push(notification);
    }

    for (const [userId, userNotifications] of groupedByUser.entries()) {
      const unreadCount = await this.notificationRepo.countUnread(userId);
      for (const notification of userNotifications) {
        emitNotificationCreated(userId, notification, unreadCount);
      }
    }

    return notifications;
  }
}
