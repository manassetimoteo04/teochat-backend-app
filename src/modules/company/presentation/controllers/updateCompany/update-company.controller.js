import { CompanyMongoRepository } from "../../../infrastructure/repositories/company.mongo.repository.js";
import { UpdateCompanyService } from "../../../usecases/update/update-company.service.js";
const companyRepo = new CompanyMongoRepository();
const updateCom = new UpdateCompanyService({ companyRepo });
export async function updateCompany(req, res, next) {
  try {
    const company = await updateCom.execute({ ...req.body, id: req.params.id });
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
}
