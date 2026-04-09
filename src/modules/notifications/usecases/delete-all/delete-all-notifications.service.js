import {
  emitAllNotificationsDeleted,
  emitUnreadCount,
} from "../../../shared/utils/send.notifications.js";

export class DeleteAllNotificationsService {
  constructor({ notificationRepo }) {
    this.notificationRepo = notificationRepo;
  }

  async execute({ userId }) {
    const deletedCount = await this.notificationRepo.deleteAll(userId);
    emitAllNotificationsDeleted(userId);
    emitUnreadCount(userId, 0);
    return { deletedCount, unreadCount: 0 };
  }
}
