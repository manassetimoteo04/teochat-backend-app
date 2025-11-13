import { EventNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";
import { EventCanceledEvent } from "../../domain/events/eventCanceled/event-canceled.js";

export class CancelEventService {
  constructor({ eventRepo, eventBus }) {
    this.eventRepo = eventRepo;
    this.eventBus = eventBus;
  }
  async execute({ eventId }) {
    const canceledEvent = await this.eventRepo.update(eventId, {
      status: "canceled",
    });
    if (!canceledEvent) throw new EventNotFoundError();
    const event = new EventCanceledEvent({ eventId: canceledEvent.id });
    this.eventBus.emit(event.name, event);
    return canceledEvent;
  }
}
