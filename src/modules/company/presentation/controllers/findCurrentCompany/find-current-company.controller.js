import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { CompanyMongoRepository } from "../../../infrastructure/repositories/company.mongo.repository.js";
import { FindCurrentCompanyService } from "../../../usecases/findCurrentCompany/find-current-company.service.js";
const userRepo = new UserMongoRepository();
const companyRepo = new CompanyMongoRepository();
const currentCompany = new FindCurrentCompanyService({ userRepo, companyRepo });
export async function findCurrentCompany(req, res, next) {
  try {
    const company = await currentCompany.execute({
      userId: req.user.id,
      companyId: req.params.id,
    });
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
}
