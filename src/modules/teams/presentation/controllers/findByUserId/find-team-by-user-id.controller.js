import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { TeamsMongoRepository } from "../../../infrastructure/repositories/team-mongo.repository.js";
import { FindTeamByUserIdService } from "../../../usecases/findByUserId/find-by-user-id.service.js";
const userRepo = new UserMongoRepository();
const companyRepo = new CompanyMongoRepository();
const teamRepo = new TeamsMongoRepository();
const findTeams = new FindTeamByUserIdService({
  userRepo,
  companyRepo,
  teamRepo,
});
export async function findTeamByUserId(req, res, next) {
  try {
    const teams = await findTeams.execute({
      companyId: req.params.companyId,
      userId: req.body.userId,
    });
    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    next(error);
  }
}
