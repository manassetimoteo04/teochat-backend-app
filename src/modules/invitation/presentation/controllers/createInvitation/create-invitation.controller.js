import { InvitationMongoRepository } from "../../../infrastructure/repositories/invitation-mongo.repository.js";
import { CreateInvitationService } from "../../../usecases/create/create-invitation.service.js";

const invitationRepo = new InvitationMongoRepository();
const createInv = new CreateInvitationService({ invitationRepo });
export async function createInvitation(req, res, next) {
  try {
    const invitation = await createInv.execute(req.body);
    res.status(201).json({ success: true, data: invitation });
  } catch (error) {
    next(error);
  }
}
