export class SendInvitationService {
  constructor({ emailService, generateTemplates }) {
    this.emailService = emailService;
    this.generateTemplates = generateTemplates;
  }
  async execute({ emails }) {
    console.log(emails);
    await Promise.allSettled(
      emails.map(({ destination, name, link }) =>
        this.emailService({
          to: destination,
          subject: `Convite para aderir a empresa ${name} no TeoChat.`,
          html: this.generateTemplates({
            companyName: name,
            actionLink: link,
          }),
        })
      )
    );
  }
}
