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
  async execute({ emails: destinations, companyId, userId }) {
    const isArray = Array.isArray(destinations);
    const emailsList = isArray ? destinations : destinations.split(",");
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isMember(userId)) throw NotCompanyMemberError();
    const expiresIn = Date.now() + 60 * 60 * 24 * 7 * 1000;
    const emails = emailsList.map((email) => ({
      destination: email,
      company: companyId,
      expiresIn,
      createdBy: userId,
    }));
    const invitations = await this.invitationRepo.create(emails);
    const payloads = invitations.map((invitation) => ({
      destination: invitation.destination,
      name: company.name,
      link: invitation.generateLink(),
    }));
    const event = new InvitationCreatedEvent(payloads);
    this.eventBus.emit(event.name, event);
    return invitations;
  }
}
