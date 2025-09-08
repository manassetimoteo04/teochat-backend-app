import { EventNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class SendEventReminderService {
  constructor({
    eventRepo,
    teamRepo,
    companyRepo,
    emailService,
    generateTemplates,
  }) {
    this.eventRepo = eventRepo;
    this.teamRepo = teamRepo;
    this.companyRepo = companyRepo;
    this.emailService = emailService;
    this.generateTemplates = generateTemplates;
  }
  async execute({ eventId }) {
    try {
      const event = await this.eventRepo.findById(eventId);
      if (!event) throw new EventNotFoundError();
      const {
        members,
        name: teamName,
        companyId,
      } = await this.teamRepo.findMembers(event.teamId.id);
      const company = await this.companyRepo.findById(companyId);

      for (const member of members) {
        const data = {
          to: member.email,
          subject: "Verificação da Conta TeoChat",
          html: this.generateTemplates({
            teamName,
            companyName: company.name,
            eventName: event.name,
            eventDate: event.date,
            eventTime: event.startTime,
            eventLink: "http://localhost:500",
          }),
        };
        await this.emailService(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
