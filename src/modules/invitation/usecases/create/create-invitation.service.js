import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";
import { InvitationCreatedEvent } from "../../domain/events/invitationCreated/invitation-created-event.js";

export class CreateInvitationService {
  constructor({ invitationRepo, companyRepo, userRepo, eventBus }) {
    this.invitationRepo = invitationRepo;
    this.companyRepo = companyRepo;
    this.userRepo = userRepo;
    this.eventBus = eventBus;
  }
  async execute({ emails: destination, companyId, userId }) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isMember(userId)) throw NotCompanyMemberError();
    const expiresIn = Date.now() + 60 * 60 * 24 * 7 * 1000;
    const invitation = await this.invitationRepo.create({
      destination,
      company: companyId,
      expiresIn,
      createdBy: userId,
    });
    const link = invitation.generateLink();
    console.log(link);
    const event = new InvitationCreatedEvent({
      ...invitation,
      name: company.name,
      link,
    });
    this.eventBus.emit(event.name, event);
    return invitation;
  }
}
