export class CreateInvitationService {
  constructor({ invitationRepo }) {
    this.invitationRepo = invitationRepo;
  }
  async execute({ destination, company, senderId }) {
    const expiresIn = Date.now() + 60 * 60 * 24 * 7 * 1000;
    const invitation = await this.invitationRepo.create({
      destination,
      company,
      expiresIn,
      createdBy: senderId,
    });
    return invitation;
  }
}
