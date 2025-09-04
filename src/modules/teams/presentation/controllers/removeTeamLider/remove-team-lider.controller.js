import { TeamsMongoRepository } from "../../../infrastructure/repositories/team-mongo.repository.js";
import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";
import { RemoveTeamLiderService } from "../../../usecases/removeLider/remove-team-lider.service.js";

const teamRepo = new TeamsMongoRepository();
const companyRepo = new CompanyMongoRepository();
const removeMember = new RemoveTeamLiderService({ teamRepo, companyRepo });
export async function removeTeamLider(req, res, next) {
  try {
    const data = await removeMember.execute({
      userId: req.user.id,
      companyId: req.params.companyId,
      teamId: req.params.id,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
