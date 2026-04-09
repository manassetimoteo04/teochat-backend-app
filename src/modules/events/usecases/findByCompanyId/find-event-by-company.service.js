import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindEventByCompanyId {
  constructor({ eventRepo, teamRepo, companyRepo, userRepo }) {
    this.eventRepo = eventRepo;
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

    let events = await this.eventRepo.findByCompanyId(companyId);

    if (!isAdmin) {
      const teams = await this.teamRepo.findByUserId({ companyId, userId });
      const allowedTeamIds = new Set(teams.map((team) => team.id.toString()));
      events = events.filter((event) =>
        allowedTeamIds.has(event.teamId?.id?.toString()),
      );
    }

    return events;
  }
}
