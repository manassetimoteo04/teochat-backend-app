import { UserNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";
import { CompanyEntity } from "../../domain/entities/company.entity.js";

export class CreateCompanyService {
  constructor({ userRepo, companyRepo }) {
    this.userRepo = userRepo;
    this.companyRepo = companyRepo;
  }
  async execute({ name, description, industry, userId }) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();
    const company = new CompanyEntity({
      name,
      description,
      ownerName: user.name,
      industry,
      createdBy: userId,
      members: [userId],
    });

    const newCompany = await this.companyRepo.create(company);
    await this.userRepo.addCompany(userId, newCompany.id, "super_admin");
    return newCompany;
  }
}
