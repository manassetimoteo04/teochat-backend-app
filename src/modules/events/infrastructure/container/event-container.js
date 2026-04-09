import { CompanyMongoRepository } from "../../../company/infrastructure/repositories/company.mongo.repository.js";
import { upcomingEventTemplate } from "../../../shared/helpers/generate-email-templates.js";
import sendEmail from "../../../shared/infrastructure/email/email.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import { TeamsMongoRepository } from "../../../teams/infrastructure/repositories/team-mongo.repository.js";
import { MeetingCallMongoRepository } from "../../../meetings/infrastructure/repositories/meeting-call.mongo.repository.js";
import UserMongoRepository from "../../../user/infrastructure/repositories/user.mongo.repository.js";
import { CancelEventService } from "../../usecases/cancel/cancel-event.service.js";
import { CreateEventService } from "../../usecases/create/create-event.service.js";
import { FindEventByCompanyId } from "../../usecases/findByCompanyId/find-event-by-company.service.js";
import { FindEventService } from "../../usecases/findById/find-event.service.js";
import { FindEventByTeamIdService } from "../../usecases/findByTeamId/find-event-by-team-id.service.js";
import { SendEventReminderService } from "../../usecases/sendReminder/send-event-reminder.service.js";
import { UpdateEventService } from "../../usecases/update/update-event.service.js";
import { EventMongoRepository } from "../repositories/event-mongo.repository.js";

const eventRepo = new EventMongoRepository();
const teamRepo = new TeamsMongoRepository();
const companyRepo = new CompanyMongoRepository();
const meetingCallRepo = new MeetingCallMongoRepository();
const userRepo = new UserMongoRepository();

const createEvent = new CreateEventService({
  eventRepo,
  userRepo,
  eventBus,
  teamRepo,
  meetingCallRepo,
});
const updateEvent = new UpdateEventService({
  eventRepo,
  eventBus,
  teamRepo,
  userRepo,
});
const findEvent = new FindEventService({ eventRepo });
const findByTeam = new FindEventByTeamIdService({ eventRepo, teamRepo });
const findByCompany = new FindEventByCompanyId({
  eventRepo,
  teamRepo,
  companyRepo,
  userRepo,
});
const cancelEvent = new CancelEventService({
  eventRepo,
  eventBus,
  teamRepo,
  userRepo,
});
const sendEventReminders = new SendEventReminderService({
  eventRepo,
  teamRepo,
  companyRepo,
  eventBus,
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
  findByCompany,
};
