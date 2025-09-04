import { TeamsMongoRepository } from "../../../infrastructure/repositories/team-mongo.repository.js";
import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { SetTeamLiderService } from "../../../usecases/setLider/set-team-lider.service.js";

const teamRepo = new TeamsMongoRepository();
const companyRepo = new CompanyMongoRepository();
const userRepo = new UserMongoRepository();
const setLitder = new SetTeamLiderService({
  teamRepo,
  companyRepo,
  userRepo,
});
export async function setTeamLider(req, res, next) {
  try {
    const data = await setLitder.execute({
      userId: req.user.id,
      companyId: req.params.companyId,
      teamId: req.params.id,
      memberId: req.body.memberId,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
