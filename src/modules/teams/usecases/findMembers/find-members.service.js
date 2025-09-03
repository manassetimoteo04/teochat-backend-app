import {
  NotTeamCompanyError,
  TeamNotFoundError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindTeamMembersService {
  constructor({ userRepo, teamRepo }) {
    this.userRepo = userRepo;
    this.teamRepo = teamRepo;
  }
  async execute({ userId, teamId, companyId }) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();
    if (!team.isCompany(companyId)) throw new NotTeamCompanyError();
    const { members } = await this.teamRepo.findMembers(teamId);
    return members;
  }
}
