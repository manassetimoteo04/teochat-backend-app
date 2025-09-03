import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { TeamsMongoRepository } from "../../../infrastructure/repositories/team-mongo.repository.js";
import { FindTeamByIdService } from "../../../usecases/findById/find-by-id.service.js";

const companyRepo = new CompanyMongoRepository();
const teamRepo = new TeamsMongoRepository();
const userRepo = new UserMongoRepository();
const findTeamService = new FindTeamByIdService({
  companyRepo,
  userRepo,
  teamRepo,
});
export async function findTeam(req, res, next) {
  try {
    const team = await findTeamService.execute({
      userId: req.user.id,
      teamId: req.params.id,
      companyId: req.params.companyId,
    });
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
}
