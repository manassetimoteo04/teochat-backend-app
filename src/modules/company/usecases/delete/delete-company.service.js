import {
  CompanyNotFoundError,
  NotCompanyMemberError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class DeleteCompanyService {
  constructor({ companyRepo }) {
    this.companyRepo = companyRepo;
  }
  async execute({ companyId, userId }) {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    const isMember = company.isMember(userId);
    if (!isMember) throw new NotCompanyMemberError();
    await this.companyRepo.delete(companyId);
  }
}
