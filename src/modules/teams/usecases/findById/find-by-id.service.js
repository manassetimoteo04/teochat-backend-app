import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  TeamNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindTeamByIdService {
  constructor({ companyRepo, teamRepo }) {
    this.companyRepo = companyRepo;
    this.teamRepo = teamRepo;
  }
  async execute({ teamId, userId }) {
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();
    const company = await this.companyRepo.findById(team.companyId);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isMember(userId)) throw new NotCompanyMemberError();
    return team;
  }
}
