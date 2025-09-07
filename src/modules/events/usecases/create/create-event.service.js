export class CreateEventService {
  constructor({ eventRepo, userRepo }) {
    this.eventRepo = eventRepo;
    this.userRepo = userRepo;
  }
  async execute({ ...eventData }) {
    const event = await this.eventRepo.create({
      ...eventData,
    });
    return event;
  }
}
