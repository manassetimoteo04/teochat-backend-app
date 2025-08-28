import {
  CompanyNotFoundError,
  NotCompanyMemberError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindCompanyByIdService {
  constructor({ companyRepo }) {
    this.companyRepo = companyRepo;
  }
  async execute({ userId, companyId }) {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    const isMember = company.isMember(userId);
    console.log(company);
    console.log(isMember, userId);
    if (!isMember) throw new NotCompanyMemberError();
    return company;
  }
}
