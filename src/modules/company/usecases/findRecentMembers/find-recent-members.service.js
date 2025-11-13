import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindRecentMembersService {
  constructor({ userRepo, companyRepo }) {
    this.userRepo = userRepo;
    this.companyRepo = companyRepo;
  }
  async execute({ userId, companyId }) {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isMember(userId)) throw new NotCompanyMemberError();
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();
    const members = await this.userRepo.findCompanyRecentMembers({
      companyId,
      userId,
    });
    return members;
  }
}
