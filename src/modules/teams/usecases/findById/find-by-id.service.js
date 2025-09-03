import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  NotTeamCompanyError,
  TeamNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindTeamByIdService {
  constructor({ companyRepo, teamRepo }) {
    this.companyRepo = companyRepo;
    this.teamRepo = teamRepo;
  }
  async execute({ teamId, userId, companyId }) {
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();
    if (!team.isCompany(companyId)) throw new NotTeamCompanyError();
    const company = await this.companyRepo.findById(team.companyId);
    if (!company) throw new CompanyNotFoundError();

    if (!company.isMember(userId)) throw new NotCompanyMemberError();
    return team;
  }
}
