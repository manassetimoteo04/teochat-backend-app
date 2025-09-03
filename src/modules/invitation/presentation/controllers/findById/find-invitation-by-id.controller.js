import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { InvitationMongoRepository } from "../../../infrastructure/repositories/invitation-mongo.repository.js";
import { FindInvitationByIdService } from "../../../usecases/findById/find-invitation-by-id.service.js";

const invitationRepo = new InvitationMongoRepository();
const userRepo = new UserMongoRepository();
const createInv = new FindInvitationByIdService({ invitationRepo, userRepo });
export async function findInvitation(req, res, next) {
  try {
    const invitation = await createInv.execute({
      ...req.params,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, data: invitation });
  } catch (error) {
    next(error);
  }
}
