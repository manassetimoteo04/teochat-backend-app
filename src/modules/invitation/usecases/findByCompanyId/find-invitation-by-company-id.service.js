import {
  CompanyNotFoundError,
  NotCompanyMemberError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindInvitationByCompanyIdService {
  constructor({ invitationRepo, companyRepo }) {
    this.invitationRepo = invitationRepo;
    this.companyRepo = companyRepo;
  }
  async execute({ companyId, userId }) {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    const isMember = company.isMember(userId);
    if (!isMember) throw new NotCompanyMemberError();
    const invitations = await this.invitationRepo.findByCompanyId(companyId);
    return invitations;
  }
}
