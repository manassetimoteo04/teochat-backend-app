import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  NotTeamCompanyError,
  TeamNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class AddTeamMembersService {
  constructor({ userRepo, companyRepo, teamRepo, eventBus }) {
    this.userRepo = userRepo;
    this.companyRepo = companyRepo;
    this.teamRepo = teamRepo;
    this.eventBus = eventBus;
  }
  async execute({ userId, companyId, teamId, members }) {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isMember(userId)) throw new NotCompanyMemberError();
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();
    if (!team.isCompany(companyId)) throw new NotTeamCompanyError();

    const currentMembers = new Set((team.members || []).map((member) => member.toString()));
    const newMembers = (members || [])
      .map((member) => member.toString())
      .filter((memberId) => !currentMembers.has(memberId));

    const updatedTeam = await this.teamRepo.addMember(teamId, members);

    if (newMembers.length) {
      const actor = await this.userRepo.findById(userId);
      this.eventBus.emit("TeamMembersAdded", {
        name: "TeamMembersAdded",
        payload: {
          companyId,
          companyName: company.name,
          teamId: updatedTeam.id,
          teamName: updatedTeam.name,
          memberIds: newMembers,
          actor,
        },
      });
    }

    return updatedTeam;
  }
}
