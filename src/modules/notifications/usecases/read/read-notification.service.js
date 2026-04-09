import {
  emitNotificationUpdated,
  emitUnreadCount,
} from "../../../shared/utils/send.notifications.js";

export class ReadNotificationService {
  constructor({ notificationRepo }) {
    this.notificationRepo = notificationRepo;
  }

  async execute({ id, userId }) {
    const notification = await this.notificationRepo.markAsRead({ id, userId });
    const unreadCount = await this.notificationRepo.countUnread(userId);

    if (notification) {
      emitNotificationUpdated(userId, notification, unreadCount);
    } else {
      emitUnreadCount(userId, unreadCount);
    }

    return notification;
  }
}
