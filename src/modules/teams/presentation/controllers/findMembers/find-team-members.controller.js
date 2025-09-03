import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { TeamsMongoRepository } from "../../../infrastructure/repositories/team-mongo.repository.js";
import { FindTeamMembersService } from "../../../usecases/findMembers/find-members.service.js";
const teamRepo = new TeamsMongoRepository();
const userRepo = new UserMongoRepository();
const findMembers = new FindTeamMembersService({ teamRepo, userRepo });
export async function findTeamMembers(req, res, next) {
  try {
    const members = await findMembers.execute({
      userId: req.user.id,
      teamId: req.params.id,
      companyId: req.params.companyId,
    });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
}
