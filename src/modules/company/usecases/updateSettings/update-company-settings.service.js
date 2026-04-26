import { loadCompanyContext, ensureCompanyAdmin } from "../shared/company-permissions.js";

export class UpdateCompanySettingsService {
  constructor({ companyRepo, userRepo }) {
    this.companyRepo = companyRepo;
    this.userRepo = userRepo;
  }

  async execute({ companyId, userId, name, ownerName, description, industry, logo }) {
    const { company, role } = await loadCompanyContext({
      companyRepo: this.companyRepo,
      userRepo: this.userRepo,
      companyId,
      userId,
    });

    ensureCompanyAdmin(role);

    company.updateCompany({ name, ownerName, description, industry, logo });
    const updatedCompany = await this.companyRepo.update(companyId, company);
    updatedCompany.members = undefined;
    return updatedCompany;
  }
}
