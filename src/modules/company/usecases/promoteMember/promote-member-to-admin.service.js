import { generateEmailTemplate } from "../../../shared/helpers/generate-email-templates.js";
import {
  InsufficientCompanyRoleError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";
import { ensureCompanyAdmin, loadCompanyContext } from "../shared/company-permissions.js";

export class PromoteMemberToAdminService {
  constructor({ companyRepo, userRepo, notificationService, emailService }) {
    this.companyRepo = companyRepo;
    this.userRepo = userRepo;
    this.notificationService = notificationService;
    this.emailService = emailService;
  }

  async execute({ companyId, userId, memberId }) {
    const { company, user, role } = await loadCompanyContext({
      companyRepo: this.companyRepo,
      userRepo: this.userRepo,
      companyId,
      userId,
    });

    ensureCompanyAdmin(role);

    const member = await this.userRepo.findById(memberId);
    if (!member) throw new UserNotFoundError();

    const membership = member.getCompanyMembership(companyId);
    if (!membership) {
      throw new InsufficientCompanyRoleError("O utilizador informado não faz parte desta empresa.");
    }

    if (membership.role === "super_admin") {
      throw new InsufficientCompanyRoleError(
        "O super administrador já possui o nível máximo de acesso.",
      );
    }

    const updatedMember = await this.userRepo.updateCompanyRole({
      userId: memberId,
      companyId,
      role: "admin",
    });

    await Promise.all([
      this.notificationService.execute({
        userId: memberId,
        type: "company.member.promoted",
        category: "company",
        title: "Promovido para administrador",
        message: `Agora tens permissões de administrador na empresa ${company.name}.`,
        actor: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        },
        entity: {
          id: company.id,
          kind: "company",
        },
        metadata: {
          companyId: company.id,
          role: "admin",
        },
      }),
      this.emailService({
        to: member.email,
        subject: `Nova permissão de administrador em ${company.name}`,
        html: generateEmailTemplate({
          templateType: "welcome",
          companyName: company.name,
          title: "Agora és administrador",
          subtitle: `A tua permissão foi atualizada na empresa ${company.name}.`,
          mainContent: `
            <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #334155;">
              <strong style="color: #0f172a;">${user.name}</strong> promoveu a tua conta para administrador.
            </p>
            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #475569;">
              Já podes gerir membros, convites e definições da empresa diretamente no TeoChat.
            </p>
          `,
        }),
      }),
    ]);

    updatedMember.password = undefined;
    return updatedMember;
  }
}
