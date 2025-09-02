import UserMongoRepository from "../../../infrastructure/repositories/user.mongo.repository.js";
import { FindUserCompaniesService } from "../../../usecases/findUserCompanies/find-user-companies.service.js";
const userRepo = new UserMongoRepository();
const findUserCom = new FindUserCompaniesService({ userRepo });
export async function findUserCompanies(req, res, next) {
  try {
    const companies = await findUserCom.execute({ userId: req.user.id });
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    next(error);
  }
}
