import {
  CompanyNotFoundError,
  NotCompanyMemberError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindCompanyMembersService {
  constructor({ companyRepo }) {
    this.companyRepo = companyRepo;
  }
  async execute({ id, userId }) {
    const company = await this.companyRepo.findById(id);
    if (!company) throw new CompanyNotFoundError();
    const isMember = company.isMember(userId);
    if (!isMember) throw new NotCompanyMemberError();
    const { members } = await this.companyRepo.findMembers(id);
    return members;
  }
}
