import { ensureCompanySuperAdmin, loadCompanyContext } from "../shared/company-permissions.js";

export class DeactivateCompanyService {
  constructor({ companyRepo, userRepo }) {
    this.companyRepo = companyRepo;
    this.userRepo = userRepo;
  }

  async execute({ companyId, userId }) {
    const { role } = await loadCompanyContext({
      companyRepo: this.companyRepo,
      userRepo: this.userRepo,
      companyId,
      userId,
    });

    ensureCompanySuperAdmin(role);

    const updatedCompany = await this.companyRepo.update(companyId, {
      isActive: false,
    });

    updatedCompany.members = undefined;
    return updatedCompany;
  }
}
