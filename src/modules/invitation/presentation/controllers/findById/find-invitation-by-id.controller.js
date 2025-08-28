import { InvitationMongoRepository } from "../../../infrastructure/repositories/invitation-mongo.repository.js";
import { FindInvitationByIdService } from "../../../usecases/findById/find-invitation-by-id.service.js";

const invitationRepo = new InvitationMongoRepository();
const createInv = new FindInvitationByIdService({ invitationRepo });
export async function findInvitation(req, res, next) {
  try {
    const invitation = await createInv.execute(req.body);
    res.status(201).json({ success: true, data: invitation });
  } catch (error) {
    next(error);
  }
}
