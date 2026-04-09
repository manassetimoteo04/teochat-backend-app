import {
  emitNotificationDeleted,
  emitUnreadCount,
} from "../../../shared/utils/send.notifications.js";

export class DeleteNotificationService {
  constructor({ notificationRepo }) {
    this.notificationRepo = notificationRepo;
  }

  async execute({ id, userId }) {
    const notification = await this.notificationRepo.deleteOne({ id, userId });
    const unreadCount = await this.notificationRepo.countUnread(userId);

    if (notification) {
      emitNotificationDeleted(userId, notification.id, unreadCount);
    } else {
      emitUnreadCount(userId, unreadCount);
    }

    return notification;
  }
}
