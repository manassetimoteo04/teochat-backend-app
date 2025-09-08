import { CompanyMongoRepository } from "../../../company/infrastructure/repositories/company.mongo.repository.js";
import { upcomingEventTemplate } from "../../../shared/helpers/generate-email-templates.js";
import sendEmail from "../../../shared/infrastructure/email/email.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import { TeamsMongoRepository } from "../../../teams/infrastructure/repositories/team-mongo.repository.js";
import { CancelEventService } from "../../usecases/cancel/cancel-event.service.js";
import { CreateEventService } from "../../usecases/create/create-event.service.js";
import { FindEventService } from "../../usecases/findById/find-event.service.js";
import { FindEventByTeamIdService } from "../../usecases/findByTeamId/find-event-by-team-id.service.js";
import { SendEventReminderService } from "../../usecases/sendReminder/send-event-reminder.service.js";
import { UpdateEventService } from "../../usecases/update/update-event.service.js";
import { EventMongoRepository } from "../repositories/event-mongo.repository.js";
const eventRepo = new EventMongoRepository();
const teamRepo = new TeamsMongoRepository();
const companyRepo = new CompanyMongoRepository();
const createEvent = new CreateEventService({ eventRepo, eventBus });
const updateEvent = new UpdateEventService({ eventRepo });
const findEvent = new FindEventService({ eventRepo });
const findByTeam = new FindEventByTeamIdService({ eventRepo, teamRepo });
const cancelEvent = new CancelEventService({ eventRepo });
const sendEventReminders = new SendEventReminderService({
  eventRepo,
  teamRepo,
  companyRepo,
  emailService: sendEmail,
  generateTemplates: upcomingEventTemplate,
});

export default {
  updateEvent,
  findEvent,
  findByTeam,
  createEvent,
  cancelEvent,
  sendEventReminders,
};
