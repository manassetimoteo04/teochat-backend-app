import {
  CompanyNotFoundError,
  InvitationAlreadyAcceptedError,
  InvitationCanceledError,
  InvitationExpiredError,
  InvitationNotFoundError,
  NotCompanyMemberError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class CancelInvitationService {
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
    const company = await this.companyRepo.findById(invitation.company);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isMember(userId)) throw NotCompanyMemberError();
    if (invitation.isExpired())
      throw new InvitationExpiredError(
        "Este convite já expirou não podes cancelar"
      );
    if (invitation.isAccepted())
      throw new InvitationAlreadyAcceptedError(
        "Este convite já foi aceite não podes cancelar"
      );
    if (invitation.isCanceled())
      throw new InvitationCanceledError(
        "Este convite já foi cancelado, não pode ser refeito"
      );

    const invi = await this.invitationRepo.cancel(id);
    return invi;
  }
}
