import { isBefore } from "date-fns";
import { EventTimeConflictError } from "../../../shared/infrastructure/errors/error.messages.js";
import { EventEntity } from "../../domain/entities/events.entities.js";
import { EventCreatedEvent } from "../../domain/events/eventCreated/event-created.js";

export class CreateEventService {
  constructor({ eventRepo, userRepo, eventBus, teamRepo, meetingCallRepo }) {
    this.eventRepo = eventRepo;
    this.userRepo = userRepo;
    this.eventBus = eventBus;
    this.teamRepo = teamRepo;
    this.meetingCallRepo = meetingCallRepo;
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
    if (conflict) throw new EventTimeConflictError();
    const eventEntity = new EventEntity({
      date,
      startTime,
      endTime,
      teamId,
      ...eventData,
    });
    const createdEvent = await this.eventRepo.create(eventEntity);
    const eventDate = new Date(eventEntity.startTime);
    const team = await this.teamRepo.findById(teamId);
    const actor = eventData.createdBy
      ? await this.userRepo.findById(eventData.createdBy)
      : null;

    const reminderTime = new Date(eventDate.getTime() - 4 * 60 * 1000);
    const event = new EventCreatedEvent({
      payload: {
        eventId: createdEvent.id,
        reminderTime,
        companyId: createdEvent.companyId,
        teamId,
        teamName: team?.name,
        title: createdEvent.title,
        startTime: createdEvent.startTime,
        endTime: createdEvent.endTime,
        type: createdEvent.type,
        location: createdEvent.location,
        memberIds: (team?.members || []).map((member) => member.toString()),
        actor,
      },
    });
    this.eventBus.emit(event.name, event);

    if (eventData.type === "video-call" && this.meetingCallRepo) {
      const allowedMembers = team?.members || [];
      await this.meetingCallRepo.createIfNotExists({
        eventId: createdEvent.id,
        teamId,
        companyId: createdEvent.companyId,
        allowedMembers,
        startTime: createdEvent.startTime,
        endTime: createdEvent.endTime,
        status: "pending",
      });
    }
    return createdEvent;
  }
}
