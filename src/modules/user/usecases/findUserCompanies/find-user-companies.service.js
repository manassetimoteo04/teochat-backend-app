import { UserNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class FindUserCompaniesService {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }
  async execute({ userId }) {
    const user = await this.userRepo.findCompanies(userId);
    if (!user) throw new UserNotFoundError();
    return user.getCompanies();
  }
}
