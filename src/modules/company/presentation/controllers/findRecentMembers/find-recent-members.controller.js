import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { CompanyMongoRepository } from "../../../infrastructure/repositories/company.mongo.repository.js";
import { FindRecentMembersService } from "../../../usecases/findRecentMembers/find-recent-members.service.js";
const companyRepo = new CompanyMongoRepository();
const userRepo = new UserMongoRepository();
const findMembers = new FindRecentMembersService({ companyRepo, userRepo });
export async function findRecentMembers(req, res, next) {
  try {
    const members = await findMembers.execute({
      companyId: req.params.id,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
}
