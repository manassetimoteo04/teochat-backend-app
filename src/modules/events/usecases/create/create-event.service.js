export class CreateEventService {
  constructor({ eventRepo, userRepo }) {
    this.eventRepo = eventRepo;
    this.userRepo = userRepo;
  }
  async execute({ agendaId, userId, ...eventData }) {
    const event = await this.eventRepo.create({
      agenda: agendaId,
      ...eventData,
    });
    return event;
  }
}
