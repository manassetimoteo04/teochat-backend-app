import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository";
import { CompanyMongoRepository } from "../../../infrastructure/repositories/company.mongo.repository";
import { CreateCompanyService } from "../../../usecases/create/create-company.service";
const userRepo = new UserMongoRepository();
const companyRepo = new CompanyMongoRepository();
const createCom = new CreateCompanyService({ userRepo, companyRepo });
export async function createCompany(req, res, next) {
  try {
    const company = await createCom.execute(req.body);
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
}
