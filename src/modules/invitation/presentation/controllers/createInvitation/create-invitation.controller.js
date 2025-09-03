import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { InvitationMongoRepository } from "../../../infrastructure/repositories/invitation-mongo.repository.js";
import { CreateInvitationService } from "../../../usecases/create/create-invitation.service.js";
import { eventBus } from "../../../../shared/infrastructure/events/event-bus.js";
const invitationRepo = new InvitationMongoRepository();
const userRepo = new UserMongoRepository();
const companyRepo = new CompanyMongoRepository();
const createInv = new CreateInvitationService({
  invitationRepo,
  userRepo,
  companyRepo,
  eventBus,
});
export async function createInvitation(req, res, next) {
  try {
    const invitation = await createInv.execute({
      ...req.params,
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json({ success: true, data: invitation });
  } catch (error) {
    next(error);
  }
}
