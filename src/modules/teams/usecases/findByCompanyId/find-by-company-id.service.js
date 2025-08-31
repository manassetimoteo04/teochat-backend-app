import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages";

export class FindTeamByCompanyIdService {
  constructor({ teamTepo, companyRepo, userRepo }) {
    this.teamTepo = teamTepo;
    this.companyRepo = companyRepo;
    this.userRepo = userRepo;
  }
  async execute({ companyId, userId }) {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();
    if (!company.isMember(userId)) throw new NotCompanyMemberError();

    const teams = await this.teamTepo.findByCompanyId(companyId);
    return teams;
  }
}
