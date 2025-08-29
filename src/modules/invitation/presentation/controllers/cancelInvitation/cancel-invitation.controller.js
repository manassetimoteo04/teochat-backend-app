import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";
import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { InvitationMongoRepository } from "../../../infrastructure/repositories/invitation-mongo.repository.js";
import { CancelInvitationService } from "../../../usecases/cancel/cancel-invitation.service.js";

const invitationRepo = new InvitationMongoRepository();
const companyRepo = new CompanyMongoRepository();
const userRepo = new UserMongoRepository();
const cancelInv = new CancelInvitationService({
  invitationRepo,
  companyRepo,
  userRepo,
});

export async function cancelInvitation(req, res, next) {
  try {
    const invitation = await cancelInv.execute({
      id: req.params.id,
      ...req.body,
    });
    res.status(200).json({ success: true, data: invitation });
  } catch (error) {
    next(error);
  }
}
