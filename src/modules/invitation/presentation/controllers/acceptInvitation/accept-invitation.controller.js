import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { InvitationMongoRepository } from "../../../infrastructure/repositories/invitation-mongo.repository.js";
import { AcceptInvitationService } from "../../../usecases/accept/accept-invitation.service.js";

const userRepo = new UserMongoRepository();
const companyRepo = new CompanyMongoRepository();
const invitationRepo = new InvitationMongoRepository();
const acceptInv = new AcceptInvitationService({
  userRepo,
  companyRepo,
  invitationRepo,
});
export async function acceptInvitation(req, res, next) {
  try {
    const invitation = await acceptInv.execute({
      id: req.params.id,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, data: invitation });
  } catch (error) {
    next(error);
  }
}
