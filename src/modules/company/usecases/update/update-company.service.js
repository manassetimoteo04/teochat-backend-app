import {
  CompanyNotFoundError,
  NotCompanyMemberError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class UpdateCompanyService {
  constructor({ companyRepo }) {
    this.companyRepo = companyRepo;
  }
  async execute({ name, ownerName, industry, id, userId, description }) {
    const company = await this.companyRepo.findById(id);
    console.log(company);
    if (!company) throw new CompanyNotFoundError();
    const isMember = company.isMember(userId);
    if (!isMember) throw new NotCompanyMemberError();
    company.updateCompany({ name, ownerName, industry, description });
    this.companyRepo.update(id, company);
    company.members = undefined;
    return company;
  }
}
