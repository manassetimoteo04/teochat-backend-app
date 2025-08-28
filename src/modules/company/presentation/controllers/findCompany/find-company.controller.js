import { CompanyMongoRepository } from "../../../infrastructure/repositories/company.mongo.repository.js";
import { FindCompanyByIdService } from "../../../usecases/findById/find-by-id.service.js";
const companyRepo = new CompanyMongoRepository();
const findCom = new FindCompanyByIdService({ companyRepo });
export async function findCompany(req, res, next) {
  try {
    const company = await findCom.execute({
      userId: req.body.userId,
      companyId: req.params.id,
    });
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
}
