import { isBefore } from "date-fns";
import {
  EventNotFoundError,
  EventTimeConflictError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class UpdateEventService {
  constructor({ eventRepo }) {
    this.eventRepo = eventRepo;
  }
  async execute({ eventId, date, startTime, endTime, teamId, ...updateData }) {
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
      id: eventId,
      date,
      startTime,
      endTime,
      teamId,
    });
    console.log(conflict, eventId, date, startTime, endTime, teamId);
    if (conflict) throw new EventTimeConflictError();

    const event = await this.eventRepo.update(eventId, {
      date,
      startTime,
      endTime,
      teamId,
      updateData,
    });
    if (!event) throw new EventNotFoundError();
    return event;
  }
}
