import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  NotTeamCompanyError,
  TeamNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class DeleteTeamService {
  constructor({ teamRepo, userRepo, companyRepo }) {
    this.teamRepo = teamRepo;
    this.userRepo = userRepo;
    this.companyRepo = companyRepo;
  }
  async execute({ userId, companyId, teamId }) {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isMember(userId)) throw new NotCompanyMemberError();
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();
    if (!team.isCompany(companyId)) throw new NotTeamCompanyError();
    await this.teamRepo.delete(teamId);
  }
}
