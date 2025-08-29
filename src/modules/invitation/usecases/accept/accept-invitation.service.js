import {
  InvitationAlreadyAcceptedError,
  InvitationCanceledError,
  InvitationExpiredError,
  InvitationNotDestitationError,
  InvitationNotFoundError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class AcceptInvitationService {
  constructor({ invitationRepo, companyRepo, userRepo }) {
    this.invitationRepo = invitationRepo;
    this.companyRepo = companyRepo;
    this.userRepo = userRepo;
  }
  async execute({ id, userId }) {
    const invitation = await this.invitationRepo.findById(id);
    if (!invitation) throw new InvitationNotFoundError();
    const user = await this.userRepo.findById(userId);

    if (!user) throw new UserNotFoundError();
    if (!invitation.isDestination(user.email))
      throw new InvitationNotDestitationError();
    if (invitation.isExpired()) throw new InvitationExpiredError();
    if (invitation.isAccepted()) throw new InvitationAlreadyAcceptedError();
    if (invitation.isCanceled()) throw new InvitationCanceledError();

    await this.companyRepo.addMember(invitation.company, user.id);
    await this.userRepo.addCompany(user.id, invitation.company, "member");
    const invi = await this.invitationRepo.accept(invitation.id);
    return invi;
  }
}
