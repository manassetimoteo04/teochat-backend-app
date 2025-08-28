import { CompanyEntity } from "../../domain/entities/company.entity";

export class CreateCompanyService {
  constructor({ userRepo, companyRepo }) {
    this.userRepo = userRepo;
    this.companyRepo = companyRepo;
  }
  async execute({ name, description, ownerName, industry, userId }) {
    const company = new CompanyEntity({
      name,
      description,
      ownerName,
      industry,
      createdBy: userId,
      members: [userId],
    });

    const newCompany = await this.companyRepo.create(company);
    await this.userRepo.addCompany(userId, newCompany.id, "super_admin");
    return { newCompany };
  }
}
