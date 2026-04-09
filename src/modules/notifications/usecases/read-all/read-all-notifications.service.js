import {
  emitAllNotificationsRead,
  emitUnreadCount,
} from "../../../shared/utils/send.notifications.js";

export class ReadAllNotificationsService {
  constructor({ notificationRepo }) {
    this.notificationRepo = notificationRepo;
  }

  async execute({ userId }) {
    const updatedCount = await this.notificationRepo.markAllAsRead(userId);
    const unreadCount = await this.notificationRepo.countUnread(userId);
    emitAllNotificationsRead(userId, unreadCount);
    emitUnreadCount(userId, unreadCount);
    return { updatedCount, unreadCount };
  }
}
