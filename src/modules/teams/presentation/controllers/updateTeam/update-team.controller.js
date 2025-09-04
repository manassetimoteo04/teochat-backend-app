import { TeamsMongoRepository } from "../../../infrastructure/repositories/team-mongo.repository.js";
import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";
import { updateTeamService } from "../../../usecases/update/update-team.service.js";

const teamRepo = new TeamsMongoRepository();
const companyRepo = new CompanyMongoRepository();
const update = new updateTeamService({ teamRepo, companyRepo });
export async function updateTeam(req, res, next) {
  try {
    const data = await update.execute({
      userId: req.user.id,
      companyId: req.params.companyId,
      teamId: req.params.id,
      ...req.body,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
