import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { CompanyMongoRepository } from "../../../infrastructure/repositories/company.mongo.repository.js";
import { FindCompanyMembersService } from "../../../usecases/findMembers/find-company-members.service.js";
const companyRepo = new CompanyMongoRepository();
const userRepo = new UserMongoRepository();
const findMembers = new FindCompanyMembersService({ companyRepo, userRepo });
export async function findCompanyMembers(req, res, next) {
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
