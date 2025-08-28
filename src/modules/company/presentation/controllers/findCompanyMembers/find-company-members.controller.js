import { CompanyMongoRepository } from "../../../infrastructure/repositories/company.mongo.repository.js";
import { FindCompanyMembersService } from "../../../usecases/findMembers/find-company-members.service.js";
const companyRepo = new CompanyMongoRepository();
const findMembers = new FindCompanyMembersService({ companyRepo });
export async function findCompanyMembers(req, res, next) {
  try {
    const members = await findMembers.execute({
      id: req.params.id,
      userId: req.body.userId,
    });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
}
