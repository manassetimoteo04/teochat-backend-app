import { CompanyMongoRepository } from "../../../company/infrastructure/repositories/company.mongo.repository.js";
import notificationContainer from "../../../notifications/infrastructure/container/notification-container.js";
import { TeamsMongoRepository } from "../../../teams/infrastructure/repositories/team-mongo.repository.js";
import UserMongoRepository from "../../../user/infrastructure/repositories/user.mongo.repository.js";
import sendEmail from "../../../shared/infrastructure/email/email.js";
import { EventMongoRepository } from "../../../events/infrastructure/repositories/event-mongo.repository.js";
import { GenerateStreamTokenService } from "../../usecases/generateStreamToken/generate-stream-token.service.js";
import { CreateInstantCallService } from "../../usecases/createInstantCall/create-instant-call.service.js";
import { MeetingCallMongoRepository } from "../repositories/meeting-call.mongo.repository.js";
import { CreateUpcomingCallsService } from "../../usecases/createUpcomingCalls/create-upcoming-calls.service.js";
import { ListTeamCallsService } from "../../usecases/listTeamCalls/list-team-calls.service.js";

const companyRepo = new CompanyMongoRepository();
const teamRepo = new TeamsMongoRepository();
const userRepo = new UserMongoRepository();
const eventRepo = new EventMongoRepository();
const meetingCallRepo = new MeetingCallMongoRepository();

const generateStreamToken = new GenerateStreamTokenService({
  companyRepo,
  teamRepo,
});

const createUpcomingCalls = new CreateUpcomingCallsService({
  meetingCallRepo,
  eventRepo,
});

const createInstantCall = new CreateInstantCallService({
  companyRepo,
  teamRepo,
  eventRepo,
  meetingCallRepo,
  userRepo,
  createNotificationService: notificationContainer.createNotification,
  emailService: sendEmail,
});

const listTeamCalls = new ListTeamCallsService({
  meetingCallRepo,
});

export default {
  generateStreamToken,
  createUpcomingCalls,
  createInstantCall,
  listTeamCalls,
};
