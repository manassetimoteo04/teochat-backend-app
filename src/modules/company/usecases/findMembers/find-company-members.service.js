import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindCompanyMembersService {
  constructor({ companyRepo, userRepo }) {
    this.companyRepo = companyRepo;
    this.userRepo = userRepo;
  }
  async execute({ companyId, userId }) {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    if (!(await this.userRepo.findById(userId))) throw new UserNotFoundError();
    if (!company.isMember(userId)) throw new NotCompanyMemberError();
    const members = await this.userRepo.findCompanyMembers({
      companyId,
      userId,
    });

    return members;
  }
}


