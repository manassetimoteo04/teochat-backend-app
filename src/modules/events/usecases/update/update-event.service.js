import { isBefore } from "date-fns";
import {
  EventNotFoundError,
  EventTimeConflictError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class UpdateEventService {
  constructor({ eventRepo, eventBus, teamRepo, userRepo }) {
    this.eventRepo = eventRepo;
    this.eventBus = eventBus;
    this.teamRepo = teamRepo;
    this.userRepo = userRepo;
  }
  async execute({ eventId, date, startTime, endTime, teamId, userId, ...updateData }) {
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
    if (conflict) throw new EventTimeConflictError();

    const event = await this.eventRepo.update(eventId, {
      date,
      startTime,
      endTime,
      teamId,
      ...updateData,
    });
    if (!event) throw new EventNotFoundError();
    const team = await this.teamRepo.findById(teamId);
    const actor = userId ? await this.userRepo.findById(userId) : null;
    const reminderTime = new Date(start.getTime() - 4 * 60 * 1000);

    this.eventBus.emit("EventUpdated", {
      name: "EventUpdated",
      payload: {
        eventId: event.id,
        reminderTime,
        companyId: event.companyId,
        teamId,
        teamName: team?.name,
        title: event.title,
        startTime: event.startTime,
        endTime: event.endTime,
        type: event.type,
        location: event.location,
        memberIds: (team?.members || []).map((member) => member.toString()),
        actor,
      },
    });
    return event;
  }
}
