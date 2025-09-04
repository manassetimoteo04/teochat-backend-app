import { TeamsMongoRepository } from "../../../infrastructure/repositories/team-mongo.repository.js";
import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";
import { DeleteTeamService } from "../../../usecases/delete/delete-team.service.js";

const teamRepo = new TeamsMongoRepository();
const companyRepo = new CompanyMongoRepository();
const deleteService = new DeleteTeamService({ teamRepo, companyRepo });
export async function deleteTeam(req, res, next) {
  try {
    await deleteService.execute({
      userId: req.user.id,
      companyId: req.params.companyId,
      teamId: req.params.id,
    });

    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
}
