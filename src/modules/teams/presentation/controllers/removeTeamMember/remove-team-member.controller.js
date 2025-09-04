import { TeamsMongoRepository } from "../../../infrastructure/repositories/team-mongo.repository.js";
import { RemoveTeamMemberService } from "../../../usecases/removeMembers/remove-team-members.service.js";
import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";

const teamRepo = new TeamsMongoRepository();
const companyRepo = new CompanyMongoRepository();
const removeMember = new RemoveTeamMemberService({ teamRepo, companyRepo });
export async function removeTeamMember(req, res, next) {
  try {
    const data = await removeMember.execute({
      userId: req.user.id,
      companyId: req.params.companyId,
      teamId: req.params.id,
      memberId: req.params.memberId,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
