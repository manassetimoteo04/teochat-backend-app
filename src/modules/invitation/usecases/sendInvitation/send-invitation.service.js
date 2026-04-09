export class SendInvitationService {
  constructor({ emailService, generateTemplates }) {
    this.emailService = emailService;
    this.generateTemplates = generateTemplates;
  }
  async execute({ emails }) {
    await Promise.allSettled(
      emails.map(({ destination, name, link }) =>
        this.emailService({
          to: destination,
          subject: `Convite para aderir à empresa ${name || "TeoChat"} no TeoChat`,
          html: this.generateTemplates({
            templateType: "convite",
            companyName: name,
            actionLink: link,
          }),
        }),
      ),
    );
  }
}
