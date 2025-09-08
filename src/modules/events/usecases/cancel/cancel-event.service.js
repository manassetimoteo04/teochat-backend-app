export class CancelEventService {
  constructor({ eventRepo }) {
    this.eventRepo = eventRepo;
  }
  async execute({ eventId }) {
    const event = await this.eventRepo.update(eventId, { status: "canceled" });
    return event;
  }
}
