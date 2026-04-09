export class ListNotificationsService {
  constructor({ notificationRepo }) {
    this.notificationRepo = notificationRepo;
  }

  async execute({ userId, page, limit, status }) {
    return this.notificationRepo.findByUserId(userId, { page, limit, status });
  }
}
