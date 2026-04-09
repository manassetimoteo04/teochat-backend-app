import { EventNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";
import { EventCanceledEvent } from "../../domain/events/eventCanceled/event-canceled.js";

export class CancelEventService {
  constructor({ eventRepo, eventBus, teamRepo, userRepo }) {
    this.eventRepo = eventRepo;
    this.eventBus = eventBus;
    this.teamRepo = teamRepo;
    this.userRepo = userRepo;
  }
  async execute({ eventId, userId }) {
    const canceledEvent = await this.eventRepo.update(eventId, {
      status: "canceled",
    });
    if (!canceledEvent) throw new EventNotFoundError();
    const team = await this.teamRepo.findById(canceledEvent.teamId);
    const actor = userId ? await this.userRepo.findById(userId) : null;
    const event = new EventCanceledEvent({
      eventId: canceledEvent.id,
      companyId: canceledEvent.companyId,
      teamId: canceledEvent.teamId,
      teamName: team?.name,
      title: canceledEvent.title,
      startTime: canceledEvent.startTime,
      endTime: canceledEvent.endTime,
      type: canceledEvent.type,
      location: canceledEvent.location,
      memberIds: (team?.members || []).map((member) => member.toString()),
      actor,
    });
    this.eventBus.emit(event.name, event);
    return canceledEvent;
  }
}
