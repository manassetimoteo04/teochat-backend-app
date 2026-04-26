import { generateEmailTemplate } from "../../../shared/helpers/generate-email-templates.js";
import {
  InsufficientCompanyRoleError,
  SelfActionNotAllowedError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";
import { ensureCompanyAdmin, loadCompanyContext } from "../shared/company-permissions.js";

export class RemoveCompanyMemberService {
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

    if (userId === memberId) {
      throw new SelfActionNotAllowedError(
        "Não podes remover e desativar a tua própria conta por esta rota.",
      );
    }

    const member = await this.userRepo.findById(memberId);
    if (!member) throw new UserNotFoundError();

    const membership = member.getCompanyMembership(companyId);
    if (!membership) {
      throw new InsufficientCompanyRoleError("O utilizador informado não faz parte desta empresa.");
    }

    if (membership.role === "super_admin") {
      throw new InsufficientCompanyRoleError(
        "O super administrador não pode ser removido da empresa.",
      );
    }

    await Promise.all([
      this.companyRepo.removeMember(companyId, memberId),
      this.userRepo.removeCompany({ userId: memberId, companyId }),
    ]);

    const refreshedMember = await this.userRepo.findById(memberId);
    const shouldDeactivateAccount = !refreshedMember.companies.length;

    if (shouldDeactivateAccount) {
      await this.userRepo.update(memberId, { isActive: false });
    }

    await Promise.all([
      this.notificationService.execute({
        userId: memberId,
        type: "company.member.removed",
        category: "company",
        title: "Removido da empresa",
        message: shouldDeactivateAccount
          ? `A tua conta foi removida da empresa ${company.name} e desativada.`
          : `A tua conta foi removida da empresa ${company.name}.`,
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
          deactivated: shouldDeactivateAccount,
        },
      }),
      this.emailService({
        to: member.email,
        subject: `Atualização de acesso em ${company.name}`,
        html: generateEmailTemplate({
          templateType: "security",
          companyName: company.name,
          title: shouldDeactivateAccount
            ? "Conta desativada após remoção"
            : "Remoção da empresa",
          subtitle: shouldDeactivateAccount
            ? `A tua conta deixou de ter acesso à empresa ${company.name} e foi desativada.`
            : `A tua conta deixou de ter acesso à empresa ${company.name}.`,
          mainContent: `
            <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #334155;">
              <strong style="color: #0f172a;">${user.name}</strong> removeu a tua conta da empresa
              <strong style="color: #0f172a;">${company.name}</strong>.
            </p>
            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #475569;">
              ${
                shouldDeactivateAccount
                  ? "Como não restaram outras empresas associadas, a tua conta também foi desativada."
                  : "Se fizeres parte de outras empresas, continuarás a conseguir entrar normalmente."
              }
            </p>
          `,
        }),
      }),
    ]);

    return {
      success: true,
      deactivated: shouldDeactivateAccount,
      memberId,
    };
  }
}
