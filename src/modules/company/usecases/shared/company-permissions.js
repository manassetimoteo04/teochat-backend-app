import {
  CompanyDeactivatedError,
  CompanyNotFoundError,
  InsufficientCompanyRoleError,
  NotCompanyMemberError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export async function loadCompanyContext({ companyRepo, userRepo, companyId, userId }) {
  const [company, user] = await Promise.all([
    companyRepo.findById(companyId),
    userRepo.findById(userId),
  ]);

  if (!company) throw new CompanyNotFoundError();
  if (!user) throw new UserNotFoundError();
  if (!company.isActive) throw new CompanyDeactivatedError();
  if (!company.isMember(userId)) throw new NotCompanyMemberError();

  return { company, user, role: user.getCompanyRole(companyId) };
}

export function ensureCompanyAdmin(role) {
  if (!["admin", "super_admin"].includes(role)) {
    throw new InsufficientCompanyRoleError();
  }
}

export function ensureCompanySuperAdmin(role) {
  if (role !== "super_admin") {
    throw new InsufficientCompanyRoleError(
      "Somente o super administrador pode executar esta ação.",
    );
  }
}
