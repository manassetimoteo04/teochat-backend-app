import {
  CompanyNotFoundError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages";

export class FindRecentMembersService {
  constructor({ userRepo, companyRepo }) {
    this.userRepo = userRepo;
    this.companyRepo = companyRepo;
  }
  async execute({ userId, companyId }) {
    const company = this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    const user = this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();
    const members = this.companyRepo.findRecentMembers(companyId);
    return members;
  }
}
