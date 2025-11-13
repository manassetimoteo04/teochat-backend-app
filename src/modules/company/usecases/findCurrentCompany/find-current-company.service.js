import {
  CompanyNotFoundError,
  NotCompanyMemberError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindCurrentCompanyService {
  constructor({ userRepo, companyRepo }) {
    this.userRepo = userRepo;
    this.companyRepo = companyRepo;
  }
  async execute({ companyId, userId }) {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isMember(userId)) throw new NotCompanyMemberError();
    const user = await this.userRepo.findCompanies(userId);
    const current = user.companies
      .filter((com) => com.companyId.id.toString() === companyId)
      .at(0);
    return current;
  }
}
