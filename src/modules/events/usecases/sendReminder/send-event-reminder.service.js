import { BASE_URL } from "../../../../configs/env.js";
import { EventNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class SendEventReminderService {
  constructor({
    eventRepo,
    teamRepo,
    companyRepo,
    eventBus,
    emailService,
    generateTemplates,
  }) {
    this.eventRepo = eventRepo;
    this.teamRepo = teamRepo;
    this.companyRepo = companyRepo;
    this.eventBus = eventBus;
    this.emailService = emailService;
    this.generateTemplates = generateTemplates;
  }
  async execute({ eventId }) {
    const event = await this.eventRepo.findById(eventId);
    if (!event) throw new EventNotFoundError();
    const {
      members,
      name: teamName,
      companyId,
    } = await this.teamRepo.findMembers(event.teamId.id);
    const company = await this.companyRepo.findById(companyId);

    const companyName = company?.name || "TeoChat";
    const eventName = event?.title || "Evento da equipa";
    const eventLink = BASE_URL || undefined;

    await Promise.allSettled(
      members
        .filter((user) => user?.email)
        .map((user) =>
          this.emailService({
            to: user.email,
            subject: `Lembrete: ${eventName} está próximo`,
            html: this.generateTemplates({
              teamName,
              companyName,
              eventName,
              eventDate: event.date,
              eventTime: event.startTime,
              eventLink,
            }),
          }),
        ),
    );

    this.eventBus.emit("EventReminderTriggered", {
      name: "EventReminderTriggered",
      payload: {
        eventId: event.id,
        companyId: event.companyId,
        teamId: event.teamId.id,
        teamName,
        title: event.title || "Evento da equipa",
        startTime: event.startTime,
        endTime: event.endTime,
        type: event.type,
        location: event.location,
        memberIds: members.map((member) => member.id.toString()),
        actor: event.createdBy || null,
      },
    });
  }
}
