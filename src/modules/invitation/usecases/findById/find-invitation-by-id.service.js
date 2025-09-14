import {
  InvitationAlreadyAcceptedError,
  InvitationCanceledError,
  InvitationExpiredError,
  InvitationNotDestitationError,
  InvitationNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindInvitationByIdService {
  constructor({ invitationRepo, userRepo }) {
    this.invitationRepo = invitationRepo;
    this.userRepo = userRepo;
  }
  async execute({ id, userId }) {
    const invitation = await this.invitationRepo.findById(id);
    const user = await this.userRepo.findById(userId);

    if (!invitation) throw new InvitationNotFoundError();
    if (!invitation.isDestination(user.email))
      throw new InvitationNotDestitationError();
    if (invitation.isExpired()) throw new InvitationExpiredError();
    if (invitation.isCanceled()) throw new InvitationCanceledError();
    if (invitation.isAccepted()) throw new InvitationAlreadyAcceptedError();
    return invitation;
  }
}
