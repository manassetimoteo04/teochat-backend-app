import { isBefore } from "date-fns";
import { EventTimeConflictError } from "../../../shared/infrastructure/errors/error.messages.js";
import { EventEntity } from "../../domain/entities/events.entities.js";
import { EventCreatedEvent } from "../../domain/events/eventCreated/event-created.js";

export class CreateEventService {
  constructor({ eventRepo, userRepo, eventBus }) {
    this.eventRepo = eventRepo;
    this.userRepo = userRepo;
    this.eventBus = eventBus;
  }
  async execute({ date, startTime, endTime, teamId, ...eventData }) {
    const start = new Date(startTime);
    const now = new Date();
    const end = new Date(endTime);
    if (isBefore(start, now))
      throw new EventTimeConflictError(
        "Eventos não podem ser agendados no passado"
      );

    if (isBefore(end, start))
      throw new EventTimeConflictError(
        "Hora de término tem de ser sempre superior ao do início do evento"
      );

    const conflict = await this.eventRepo.findByTime({
      date,
      startTime,
      endTime,
      teamId,
    });
    // if (conflict) throw new EventTimeConflictError();
    const eventEntity = new EventEntity({
      date,
      startTime,
      endTime,
      teamId,
      ...eventData,
    });
    const createdEvent = await this.eventRepo.create(eventEntity);
    const event = new EventCreatedEvent({
      payload: { eventId: createdEvent.id },
    });
    this.eventBus.emit(event.name, event);
    return createdEvent;
  }
}
