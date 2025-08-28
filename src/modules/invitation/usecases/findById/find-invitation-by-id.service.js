import { InvitationNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class FindInvitationByIdService {
  constructor({ invitationRepo }) {
    this.invitationRepo = invitationRepo;
  }
  async execute({ id }) {
    const invitation = await this.invitationRepo.findById(id);
    if (!invitation) throw new InvitationNotFoundError();
    return invitation;
  }
}
