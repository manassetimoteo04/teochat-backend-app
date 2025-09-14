import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  NotTeamCompanyError,
  NotTeamMemberError,
  TeamNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class RemoveTeamMemberService {
  constructor({ userRepo, companyRepo, teamRepo }) {
    this.userRepo = userRepo;
    this.companyRepo = companyRepo;
    this.teamRepo = teamRepo;
  }
  async execute({ userId, companyId, teamId, memberId }) {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isMember(userId)) throw new NotCompanyMemberError();
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();
    if (!team.isCompany(companyId)) throw new NotTeamCompanyError();
    if (!team.isMember(memberId)) throw new NotTeamMemberError();
    if (team.isLider(memberId)) await this.teamRepo.removeLider(teamId);
    const updatedTeam = await this.teamRepo.removeMember(teamId, memberId);
    return updatedTeam;
  }
}
