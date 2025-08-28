import { CompanyMongoRepository } from "../../../infrastructure/repositories/company.mongo.repository.js";
import { DeleteCompanyService } from "../../../usecases/delete/delete-company.service.js";

const companyRepo = new CompanyMongoRepository();
const deleteCom = new DeleteCompanyService({ companyRepo });

export async function deleteCompany(req, res, next) {
  try {
    await deleteCom.execute({ ...req.body, companyId: req.params.id });
    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
}
