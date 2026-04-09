export class GetUnreadNotificationsCountService {
  constructor({ notificationRepo }) {
    this.notificationRepo = notificationRepo;
  }

  async execute({ userId }) {
    const unreadCount = await this.notificationRepo.countUnread(userId);
    return { unreadCount };
  }
}
