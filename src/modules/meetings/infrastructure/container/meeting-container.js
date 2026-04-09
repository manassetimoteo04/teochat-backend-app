import { CompanyMongoRepository } from "../../../company/infrastructure/repositories/company.mongo.repository.js";
import { TeamsMongoRepository } from "../../../teams/infrastructure/repositories/team-mongo.repository.js";
import { GenerateStreamTokenService } from "../../usecases/generateStreamToken/generate-stream-token.service.js";
import { MeetingCallMongoRepository } from "../repositories/meeting-call.mongo.repository.js";
import { CreateUpcomingCallsService } from "../../usecases/createUpcomingCalls/create-upcoming-calls.service.js";
import { ListTeamCallsService } from "../../usecases/listTeamCalls/list-team-calls.service.js";

const companyRepo = new CompanyMongoRepository();
const teamRepo = new TeamsMongoRepository();

const generateStreamToken = new GenerateStreamTokenService({
  companyRepo,
  teamRepo,
});

const meetingCallRepo = new MeetingCallMongoRepository();
const createUpcomingCalls = new CreateUpcomingCallsService({
  meetingCallRepo,
});

const listTeamCalls = new ListTeamCallsService({
  meetingCallRepo,
});

export default {
  generateStreamToken,
  createUpcomingCalls,
  listTeamCalls,
};
