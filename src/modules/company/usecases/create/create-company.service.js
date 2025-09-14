import { UserNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";
import { CompanyEntity } from "../../domain/entities/company.entity.js";
import { CompanyCreatedEvent } from "../../domain/events/companyCreated/company-created-event.js";

export class CreateCompanyService {
  constructor({ userRepo, companyRepo, invitationRepo, eventBus }) {
    this.userRepo = userRepo;
    this.companyRepo = companyRepo;
    this.invitationRepo = invitationRepo;
    this.eventBus = eventBus;
  }
  async execute({ name, description, industry, userId, invitation }) {
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

    const event = new CompanyCreatedEvent({
      ...newCompany,
      companyId: newCompany.id,
      userId,
      emails: invitation,
    });
    this.eventBus.emit(event.name, event);
    return newCompany;
  }
}
