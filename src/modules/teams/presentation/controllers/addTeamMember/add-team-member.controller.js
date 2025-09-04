import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";
import { TeamsMongoRepository } from "../../../infrastructure/repositories/team-mongo.repository.js";
import { AddTeamMembersService } from "../../../usecases/addMembers/add-team-members.service.js";

const teamRepo = new TeamsMongoRepository();
const companyRepo = new CompanyMongoRepository();
const addMember = new AddTeamMembersService({ teamRepo, companyRepo });
export async function addTeamMember(req, res, next) {
  try {
    const data = await addMember.execute({
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
