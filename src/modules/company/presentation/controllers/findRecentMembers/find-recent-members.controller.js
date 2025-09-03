import { CompanyMongoRepository } from "../../../infrastructure/repositories/company.mongo.repository";
import { FindRecentMembersService } from "../../../usecases/findRecentMembers/find-recent-members.service";
const companyRepo = new CompanyMongoRepository();
const userRepo = new UserMongoRepository();
const findMembers = new FindRecentMembersService({ companyRepo, userRepo });
export async function findRecentMembers(req, res, next) {
  try {
    const members = await findMembers.execute({
      companyId: req.params.id,
      userId: req.user.id,
    });
  } catch (error) {
    next(error);
  }
}
