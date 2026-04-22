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
    const uniqueEmails = [...new Set(
      emailsList
        .map((email) => email?.trim().toLowerCase())
        .filter(Boolean),
    )];

    const emails = (
      await Promise.all(
        uniqueEmails.map(async (email) => {
          const invitedUser = await this.userRepo.findByEmail(email);
          const isAlreadyCompanyMember = invitedUser?.companies?.some(
            ({ companyId: invitedCompanyId }) =>
              invitedCompanyId?.toString() === companyId.toString(),
          );

          if (isAlreadyCompanyMember) return null;

          return {
            destination: email,
            company: companyId,
            expiresIn,
            createdBy: userId,
          };
        }),
      )
    ).filter(Boolean);

    if (!emails.length) return [];

    const invitations = await this.invitationRepo.create(emails);
    const payloads = invitations.map((invitation) => ({
      invitationId: invitation.id.toString(),
      destination: invitation.destination,
      name: company.name,
      companyId: company.id,
      companyName: company.name,
      link: invitation.generateLink(),
      createdBy: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
    }));
    const event = new InvitationCreatedEvent(payloads);

    this.eventBus.emit(event.name, event);
    return invitations;
  }
}
