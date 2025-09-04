import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  NotTeamCompanyError,
  TeamNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class AddTeamMembersService {
  constructor({ userRepo, companyRepo, teamRepo }) {
    this.userRepo = userRepo;
    this.companyRepo = companyRepo;
    this.teamRepo = teamRepo;
  }
  async execute({ userId, companyId, teamId, members }) {
    const company = await this.companyRepo.findById(companyId);
    console.log(company);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isMember(userId)) throw new NotCompanyMemberError();
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();
    if (!team.isCompany(companyId)) throw new NotTeamCompanyError();

    const updatedTeam = await this.teamRepo.addMember(teamId, members);
    return updatedTeam;
  }
}
