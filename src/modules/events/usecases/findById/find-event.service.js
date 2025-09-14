import { EventNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class FindEventService {
  constructor({ eventRepo }) {
    this.eventRepo = eventRepo;
  }
  async execute({ eventId }) {
    const event = await this.eventRepo.findById(eventId);
    if (!event) throw new EventNotFoundError();
    return event;
  }
}
