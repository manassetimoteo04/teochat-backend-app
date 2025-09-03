import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { TeamsMongoRepository } from "../../../infrastructure/repositories/team-mongo.repository.js";
import { CreateTeamService } from "../../../usecases/create/create-team.service.js";

const companyRepo = new CompanyMongoRepository();
const teamRepo = new TeamsMongoRepository();
const userRepo = new UserMongoRepository();
const createTeamService = new CreateTeamService({
  companyRepo,
  userRepo,
  teamRepo,
});
export async function createTeam(req, res, next) {
  try {
    console.log({
      ...req.params,
      ...req.body,
    });
    const team = await createTeamService.execute({
      userId: req.user.id,
      ...req.params,
      ...req.body,
    });
    res.status(201).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
}
