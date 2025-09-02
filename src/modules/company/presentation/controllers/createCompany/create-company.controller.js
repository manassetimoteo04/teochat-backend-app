import { InvitationMongoRepository } from "../../../../invitation/infrastructure/repositories/invitation-mongo.repository.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { CompanyMongoRepository } from "../../../infrastructure/repositories/company.mongo.repository.js";
import { CreateCompanyService } from "../../../usecases/create/create-company.service.js";
import { eventBus } from "../../../../shared/infrastructure/events/event-bus.js";
const userRepo = new UserMongoRepository();
const companyRepo = new CompanyMongoRepository();
const invitationRepo = new InvitationMongoRepository();
const createCom = new CreateCompanyService({
  userRepo,
  companyRepo,
  invitationRepo,
  eventBus,
});
export async function createCompany(req, res, next) {
  try {
    const company = await createCom.execute({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
}
