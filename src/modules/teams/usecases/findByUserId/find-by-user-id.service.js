import {
  CompanyNotFoundError,
  NotCompanyMemberError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class FindTeamByUserIdService {
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
    const teams = await this.teamRepo.findByUserId({ companyId, userId });
    return teams;
  }
}
