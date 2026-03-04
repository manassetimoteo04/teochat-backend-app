import { CompanyMongoRepository } from "../../../company/infrastructure/repositories/company.mongo.repository.js";
import { TeamsMongoRepository } from "../../../teams/infrastructure/repositories/team-mongo.repository.js";
import { GenerateStreamTokenService } from "../../usecases/generateStreamToken/generate-stream-token.service.js";

const companyRepo = new CompanyMongoRepository();
const teamRepo = new TeamsMongoRepository();

const generateStreamToken = new GenerateStreamTokenService({
  companyRepo,
  teamRepo,
});

export default {
  generateStreamToken,
};
