import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindTeamByCompanyIdService {
  constructor({ teamRepo, companyRepo, userRepo }) {
    this.teamRepo = teamRepo;
    this.companyRepo = companyRepo;
    this.userRepo = userRepo;
  }
  async execute({ companyId, userId }) {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();
    if (!company.isMember(userId)) throw new NotCompanyMemberError();

    const companyAccess = user.companies?.find(
      (item) => item.companyId?.toString() === companyId.toString(),
    );
    const isAdmin = ["admin", "super_admin"].includes(companyAccess?.role);

    const teams = isAdmin
      ? await this.teamRepo.findByCompanyId(companyId)
      : await this.teamRepo.findByUserId({ companyId, userId });

    return teams;
  }
}
