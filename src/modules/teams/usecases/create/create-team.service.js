import {
  CompanyNotFoundError,
  UserNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class CreateTeamService {
  constructor({ companyRepo, userRepo, teamRepo }) {
    this.companyRepo = companyRepo;
    this.userRepo = userRepo;
    this.teamRepo = teamRepo;
  }
  async execute({ name, companyId, tags, createdBy, description }) {
    const user = await this.userRepo.findById(createdBy);
    if (!user) throw new UserNotFoundError();
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();

    const team = await this.teamRepo.create({
      name,
      companyId,
      tags,
      createdBy,
      description,
      members: [createdBy],
    });
    return team;
  }
}
